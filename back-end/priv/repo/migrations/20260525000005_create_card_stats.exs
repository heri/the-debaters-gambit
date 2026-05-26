defmodule DebaterGambit.Repo.Migrations.CreateCardStats do
  use Ecto.Migration

  def change do
    create table(:card_stats) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :card_id, :string, null: false
      add :card_type, :string, null: false
      add :play_count, :integer, default: 0, null: false
      add :success_count, :integer, default: 0, null: false
      add :fail_count, :integer, default: 0, null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:card_stats, [:user_id, :card_id])
    create index(:card_stats, [:user_id])
  end
end
