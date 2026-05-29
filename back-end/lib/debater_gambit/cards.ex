defmodule DebaterGambit.Cards do
  import Ecto.Query
  alias DebaterGambit.Repo
  alias DebaterGambit.Cards.RemoteCard

  def list_active_cards do
    Repo.all(from c in RemoteCard, where: c.status == "active", order_by: [asc: c.inserted_at])
  end

  def list_all_cards do
    Repo.all(from c in RemoteCard, order_by: [asc: c.inserted_at])
  end

  def get_card!(id), do: Repo.get!(RemoteCard, id)

  def create_card(attrs) do
    %RemoteCard{}
    |> RemoteCard.changeset(attrs)
    |> Repo.insert()
  end

  def toggle_status(%RemoteCard{} = card) do
    new_status = if card.status == "active", do: "inactive", else: "active"
    card |> RemoteCard.changeset(%{status: new_status}) |> Repo.update()
  end

  def cards_payload do
    cards = list_active_cards()
    %{
      version: 1,
      case_cards: Enum.map(cards, &card_json/1)
    }
  end

  defp card_json(card) do
    %{
      id: card.card_id,
      title: card.title,
      description: card.description,
      difficulty: card.difficulty,
      icon: card.icon,
      focus: card.focus
    }
  end
end
