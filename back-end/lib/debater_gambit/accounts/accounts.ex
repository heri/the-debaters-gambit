defmodule DebaterGambit.Accounts do
  import Ecto.Query
  alias DebaterGambit.Repo
  alias DebaterGambit.Accounts.{User, UserToken}

  # ── Registration ──────────────────────────────────────────────────────────

  def register_user(attrs) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  # ── Authentication ────────────────────────────────────────────────────────

  def sign_in(email, password) do
    user = Repo.get_by(User, email: String.downcase(email))

    cond do
      is_nil(user) ->
        # Run hash to prevent timing attacks
        Bcrypt.no_user_verify()
        {:error, :invalid_credentials}

      not User.valid_password?(user, password) ->
        {:error, :invalid_credentials}

      true ->
        {:ok, user, generate_token(user)}
    end
  end

  def sign_out(token) do
    Repo.delete_all(from t in UserToken, where: t.token == ^token)
    :ok
  end

  def get_user_by_token(token) do
    query =
      from t in UserToken,
        where: t.token == ^token and t.context == "api",
        join: u in assoc(t, :user),
        select: u

    Repo.one(query)
  end

  # ── Helpers ───────────────────────────────────────────────────────────────

  def generate_token(user) do
    changeset = UserToken.build_token(user, "api")
    {:ok, token_record} = Repo.insert(changeset)
    token_record.token
  end
end
