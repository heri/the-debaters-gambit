defmodule DebaterGambit.Stats do
  import Ecto.Query
  alias DebaterGambit.Repo
  alias DebaterGambit.Stats.{CardStat, DrillCompletion, GameRecord}

  # ── Drills ────────────────────────────────────────────────────────────────

  def complete_drill(user_id, drill_id) do
    %DrillCompletion{}
    |> DrillCompletion.changeset(%{user_id: user_id, drill_id: drill_id})
    |> Repo.insert(on_conflict: :nothing, conflict_target: [:user_id, :drill_id])
  end

  def list_completed_drills(user_id) do
    Repo.all(from d in DrillCompletion, where: d.user_id == ^user_id, select: d.drill_id)
  end

  # ── Games ─────────────────────────────────────────────────────────────────

  def record_game(user_id, attrs) do
    %GameRecord{}
    |> GameRecord.changeset(Map.put(attrs, "user_id", user_id))
    |> Repo.insert()
  end

  def list_games(user_id, limit \\ 20) do
    Repo.all(
      from g in GameRecord,
        where: g.user_id == ^user_id,
        order_by: [desc: g.inserted_at],
        limit: ^limit
    )
  end

  # ── Card Stats ────────────────────────────────────────────────────────────
  # Each entry in `plays` is %{card_id: string, card_type: "hazard"|"move", success: bool}
  # success=true  → increment success_count
  # success=false → increment fail_count
  # Both always increment play_count

  def record_card_plays(user_id, plays) when is_list(plays) do
    Repo.transaction(fn ->
      Enum.each(plays, fn play ->
        upsert_card_stat(user_id, play)
      end)
    end)
  end

  defp upsert_card_stat(user_id, %{"card_id" => card_id, "card_type" => card_type, "success" => success}) do
    {success_delta, fail_delta} = if success, do: {1, 0}, else: {0, 1}

    Repo.insert!(
      %CardStat{
        user_id: user_id,
        card_id: card_id,
        card_type: card_type,
        play_count: 1,
        success_count: success_delta,
        fail_count: fail_delta
      },
      on_conflict: [
        inc: [play_count: 1, success_count: success_delta, fail_count: fail_delta]
      ],
      conflict_target: [:user_id, :card_id]
    )
  end

  def get_card_stats(user_id) do
    Repo.all(
      from c in CardStat,
        where: c.user_id == ^user_id,
        order_by: [desc: c.play_count]
    )
  end
end
