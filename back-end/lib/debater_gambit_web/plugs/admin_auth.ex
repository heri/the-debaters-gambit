defmodule DebaterGambitWeb.Plugs.AdminAuth do
  import Plug.Conn
  import Phoenix.Controller, only: [redirect: 2]

  @admin_email "heri@studiozenkai.com"

  def init(opts), do: opts

  def call(conn, _opts) do
    user_id = get_session(conn, :admin_user_id)

    if user_id do
      user = DebaterGambit.Accounts.get_user(user_id)

      if user && user.email == @admin_email do
        assign(conn, :admin_user, user)
      else
        conn |> clear_session() |> redirect(to: "/admin/login") |> halt()
      end
    else
      conn |> redirect(to: "/admin/login") |> halt()
    end
  end
end
