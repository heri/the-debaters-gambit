defmodule DebaterGambit.Cards.RemoteCard do
  use Ecto.Schema
  import Ecto.Changeset

  @valid_difficulties ~w(EASY MEDIUM HARD)
  @valid_statuses ~w(active inactive)
  @valid_types ~w(case)

  schema "remote_cards" do
    field :card_id, :string
    field :card_type, :string, default: "case"
    field :title, :string
    field :description, :string
    field :difficulty, :string
    field :icon, :string
    field :focus, :string
    field :status, :string, default: "active"

    timestamps(type: :utc_datetime)
  end

  def changeset(card, attrs) do
    card
    |> cast(attrs, [:card_id, :card_type, :title, :description, :difficulty, :icon, :focus, :status])
    |> validate_required([:card_id, :card_type, :title, :description, :difficulty, :icon])
    |> validate_inclusion(:difficulty, @valid_difficulties)
    |> validate_inclusion(:status, @valid_statuses)
    |> validate_inclusion(:card_type, @valid_types)
    |> validate_length(:title, min: 1, max: 200)
    |> validate_length(:description, min: 1, max: 1000)
    |> unique_constraint(:card_id)
  end
end
