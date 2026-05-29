defmodule DebaterGambitWeb.API.CardsController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Cards

  # Public — no auth required
  def index(conn, _params) do
    json(conn, Cards.cards_payload())
  end
end
