defmodule DebaterGambitWeb.Admin.SessionController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Accounts

  @admin_email "heri@studiozenkai.com"

  def new(conn, _params) do
    render(conn, :new, error: nil)
  end

  def create(conn, %{"email" => email, "password" => password}) do
    case Accounts.sign_in(email, password) do
      {:ok, user, _token} when user.email == @admin_email ->
        conn
        |> put_session(:admin_user_id, user.id)
        |> redirect(to: "/admin/cards")

      {:ok, _user, _token} ->
        render(conn, :new, error: "This account does not have admin access.")

      {:error, :invalid_credentials} ->
        render(conn, :new, error: "Invalid email or password.")
    end
  end

  def delete(conn, _params) do
    conn
    |> clear_session()
    |> redirect(to: "/admin/login")
  end
end
