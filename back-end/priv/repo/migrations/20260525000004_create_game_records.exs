defmodule DebaterGambit.Repo.Migrations.CreateGameRecords do
  use Ecto.Migration

  def change do
    create table(:game_records) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :game_type, :string, null: false
      add :winner_name, :string
      add :case_title, :string
      add :round_count, :integer, default: 1

      timestamps(type: :utc_datetime)
    end

    create index(:game_records, [:user_id])
  end
end
