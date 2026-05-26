defmodule DebaterGambit.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    has_many :tokens, DebaterGambit.Accounts.UserToken
    has_many :drill_completions, DebaterGambit.Stats.DrillCompletion
    has_many :game_records, DebaterGambit.Stats.GameRecord
    has_many :card_stats, DebaterGambit.Stats.CardStat

    timestamps(type: :utc_datetime)
  end

  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :password])
    |> validate_required([:email, :name, :password])
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "must be a valid email")
    |> validate_length(:name, min: 1, max: 60)
    |> validate_length(:password, min: 8, max: 72)
    |> unique_constraint(:email)
    |> hash_password()
  end

  defp hash_password(%{valid?: false} = changeset), do: changeset

  defp hash_password(changeset) do
    password = get_change(changeset, :password)
    put_change(changeset, :password_hash, Bcrypt.hash_pwd_salt(password))
  end

  def valid_password?(%__MODULE__{password_hash: hash}, password) do
    Bcrypt.verify_pass(password, hash)
  end
end
