defmodule DebaterGambit.Repo.Migrations.CreateRemoteCards do
  use Ecto.Migration

  def change do
    create table(:remote_cards) do
      add :card_id, :string, null: false
      add :card_type, :string, null: false, default: "case"
      add :title, :string, null: false
      add :description, :text, null: false
      add :difficulty, :string, null: false
      add :icon, :string, null: false
      add :focus, :string
      add :status, :string, null: false, default: "active"

      timestamps(type: :utc_datetime)
    end

    create unique_index(:remote_cards, [:card_id])
    create index(:remote_cards, [:status])
  end
end
