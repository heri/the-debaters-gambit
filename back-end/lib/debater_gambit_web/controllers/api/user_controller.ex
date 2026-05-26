defmodule DebaterGambitWeb.API.UserController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Accounts

  def register(conn, params) do
    attrs = %{
      "email" => String.downcase(params["email"] || ""),
      "name" => params["name"] || "",
      "password" => params["password"] || ""
    }

    case Accounts.register_user(attrs) do
      {:ok, user} ->
        token = Accounts.generate_token(user)

        conn
        |> put_status(:created)
        |> json(%{token: token, user: user_json(user)})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: format_errors(changeset)})
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Accounts.sign_in(email, password) do
      {:ok, user, token} ->
        json(conn, %{token: token, user: user_json(user)})

      {:error, :invalid_credentials} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "invalid email or password"})
    end
  end

  def sign_out(conn, _params) do
    Accounts.sign_out(conn.assigns.auth_token)
    json(conn, %{ok: true})
  end

  def me(conn, _params) do
    json(conn, %{user: user_json(conn.assigns.current_user)})
  end

  defp user_json(user), do: %{id: user.id, email: user.email, name: user.name}

  defp format_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
