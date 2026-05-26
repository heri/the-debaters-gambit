defmodule DebaterGambitWeb.API.StatsController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Stats

  # POST /api/card_stats/record
  # Body: { "plays": [{ "card_id": "h1", "card_type": "hazard", "success": true }, ...] }
  def record(conn, %{"plays" => plays}) when is_list(plays) do
    user_id = conn.assigns.current_user.id

    case Stats.record_card_plays(user_id, plays) do
      {:ok, _} -> json(conn, %{ok: true})
      {:error, reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{error: inspect(reason)})
    end
  end

  def record(conn, _params) do
    conn
    |> put_status(:bad_request)
    |> json(%{error: "expected { plays: [...] }"})
  end

  # GET /api/card_stats
  # Returns aggregated stats per card, sorted by play_count desc.
  # Only hazard and move cards are tracked (joker/filibuster/delegate excluded).
  def index(conn, _params) do
    user_id = conn.assigns.current_user.id
    stats = Stats.get_card_stats(user_id)

    json(conn, %{
      card_stats: Enum.map(stats, fn s ->
        %{
          card_id: s.card_id,
          card_type: s.card_type,
          play_count: s.play_count,
          success_count: s.success_count,
          fail_count: s.fail_count,
          success_rate: success_rate(s)
        }
      end)
    })
  end

  defp success_rate(%{play_count: 0}), do: nil
  defp success_rate(%{success_count: s, play_count: p}), do: Float.round(s / p * 100, 1)
end
