defmodule DebaterGambit.Stats.GameRecord do
  use Ecto.Schema
  import Ecto.Changeset

  schema "game_records" do
    field :game_type, :string
    field :winner_name, :string
    field :case_title, :string
    field :round_count, :integer, default: 1

    belongs_to :user, DebaterGambit.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def changeset(game_record, attrs) do
    game_record
    |> cast(attrs, [:game_type, :winner_name, :case_title, :round_count, :user_id])
    |> validate_required([:game_type, :user_id])
    |> validate_inclusion(:game_type, ["vs", "quickdraw"])
    |> validate_number(:round_count, greater_than: 0)
  end
end
