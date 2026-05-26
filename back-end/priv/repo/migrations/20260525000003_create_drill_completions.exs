defmodule DebaterGambit.Repo.Migrations.CreateDrillCompletions do
  use Ecto.Migration

  def change do
    create table(:drill_completions) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :drill_id, :string, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:drill_completions, [:user_id])
    create unique_index(:drill_completions, [:user_id, :drill_id])
  end
end
