defmodule DebaterGambitWeb.Router do
  use DebaterGambitWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug
  end

  pipeline :authenticated do
    plug DebaterGambitWeb.Plugs.Auth
  end

  scope "/api", DebaterGambitWeb.API do
    pipe_through :api

    # Public — no auth required
    post "/users/register", UserController, :register
    post "/users/sign_in", UserController, :sign_in

    # Protected — require Bearer token
    pipe_through :authenticated

    delete "/users/sign_out", UserController, :sign_out
    get "/users/me", UserController, :me

    post "/drills/:drill_id/complete", DrillController, :complete
    get "/drills", DrillController, :index

    post "/games", GameController, :create
    get "/games", GameController, :index

    post "/card_stats/record", StatsController, :record
    get "/card_stats", StatsController, :index
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:debater_gambit, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: DebaterGambitWeb.Telemetry
    end
  end
end
