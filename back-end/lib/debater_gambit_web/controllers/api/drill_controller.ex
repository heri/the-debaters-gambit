defmodule DebaterGambitWeb.API.DrillController do
  use DebaterGambitWeb, :controller
  alias DebaterGambit.Stats

  def complete(conn, %{"drill_id" => drill_id}) do
    user_id = conn.assigns.current_user.id
    Stats.complete_drill(user_id, drill_id)
    json(conn, %{ok: true, drill_id: drill_id})
  end

  def index(conn, _params) do
    user_id = conn.assigns.current_user.id
    drill_ids = Stats.list_completed_drills(user_id)
    json(conn, %{completed: drill_ids})
  end
end
