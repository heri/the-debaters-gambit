defmodule DebaterGambitWeb.Admin.CardsController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Cards

  def index(conn, _params) do
    cards = Cards.list_all_cards()
    render(conn, :index, cards: cards)
  end

  def new(conn, _params) do
    render(conn, :new, errors: nil)
  end

  def create(conn, %{"card" => params}) do
    attrs = %{
      card_id: params["card_id"],
      card_type: "case",
      title: params["title"],
      description: params["description"],
      difficulty: params["difficulty"],
      icon: params["icon"],
      focus: params["focus"]
    }

    case Cards.create_card(attrs) do
      {:ok, _card} ->
        conn
        |> put_flash(:info, "Card created.")
        |> redirect(to: "/admin/cards")

      {:error, changeset} ->
        errors = format_errors(changeset)
        render(conn, :new, errors: errors)
    end
  end

  def toggle(conn, %{"id" => id}) do
    card = Cards.get_card!(id)
    {:ok, updated} = Cards.toggle_status(card)
    action = if updated.status == "active", do: "activated", else: "deactivated"

    conn
    |> put_flash(:info, "\"#{updated.title}\" #{action}.")
    |> redirect(to: "/admin/cards")
  end

  defp format_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
