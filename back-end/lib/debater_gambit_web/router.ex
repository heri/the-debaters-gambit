defmodule DebaterGambitWeb.Router do
  use DebaterGambitWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug
  end

  pipeline :authenticated do
    plug DebaterGambitWeb.Plugs.Auth
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :admin do
    plug DebaterGambitWeb.Plugs.AdminAuth
  end

  # ── Public API ─────────────────────────────────────────────────────────────

  scope "/api", DebaterGambitWeb.API do
    pipe_through :api

    get "/cards", CardsController, :index

    post "/users/register", UserController, :register
    post "/users/sign_in", UserController, :sign_in

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

  # ── Admin ──────────────────────────────────────────────────────────────────

  scope "/admin", DebaterGambitWeb.Admin do
    pipe_through :browser

    get "/login", SessionController, :new
    post "/login", SessionController, :create
    delete "/logout", SessionController, :delete

    pipe_through :admin

    get "/cards", CardsController, :index
    get "/cards/new", CardsController, :new
    post "/cards", CardsController, :create
    post "/cards/:id/toggle", CardsController, :toggle
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
