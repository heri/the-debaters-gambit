defmodule DebaterGambit.Stats.CardStat do
  use Ecto.Schema
  import Ecto.Changeset

  schema "card_stats" do
    field :card_id, :string
    field :card_type, :string
    field :play_count, :integer, default: 0
    field :success_count, :integer, default: 0
    field :fail_count, :integer, default: 0

    belongs_to :user, DebaterGambit.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def changeset(card_stat, attrs) do
    card_stat
    |> cast(attrs, [:card_id, :card_type, :play_count, :success_count, :fail_count, :user_id])
    |> validate_required([:card_id, :card_type, :user_id])
    |> validate_inclusion(:card_type, ["hazard", "move"])
    |> unique_constraint([:user_id, :card_id])
  end
end
