defmodule DebaterGambitWeb.API.GameController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Stats

  def create(conn, params) do
    user_id = conn.assigns.current_user.id
    attrs = Map.take(params, ["game_type", "winner_name", "case_title", "round_count"])

    case Stats.record_game(user_id, attrs) do
      {:ok, game} ->
        conn
        |> put_status(:created)
        |> json(%{game: game_json(game)})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: format_errors(changeset)})
    end
  end

  def index(conn, _params) do
    user_id = conn.assigns.current_user.id
    games = Stats.list_games(user_id)
    json(conn, %{games: Enum.map(games, &game_json/1)})
  end

  defp game_json(g) do
    %{
      id: g.id,
      game_type: g.game_type,
      winner_name: g.winner_name,
      case_title: g.case_title,
      round_count: g.round_count,
      played_at: g.inserted_at
    }
  end

  defp format_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
