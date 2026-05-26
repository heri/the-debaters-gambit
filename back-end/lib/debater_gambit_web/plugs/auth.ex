defmodule DebaterGambitWeb.Plugs.Auth do
  import Plug.Conn
  import Phoenix.Controller, only: [json: 2]
  alias DebaterGambit.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         user when not is_nil(user) <- Accounts.get_user_by_token(token) do
      conn
      |> assign(:current_user, user)
      |> assign(:auth_token, token)
    else
      _ ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "unauthorized"})
        |> halt()
    end
  end
end
