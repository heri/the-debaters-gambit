defmodule DebaterGambit.Stats.DrillCompletion do
  use Ecto.Schema
  import Ecto.Changeset

  schema "drill_completions" do
    field :drill_id, :string

    belongs_to :user, DebaterGambit.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def changeset(drill_completion, attrs) do
    drill_completion
    |> cast(attrs, [:drill_id, :user_id])
    |> validate_required([:drill_id, :user_id])
    |> unique_constraint([:user_id, :drill_id])
  end
end
