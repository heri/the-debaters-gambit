defmodule DebaterGambit.Repo do
  use Ecto.Repo,
    otp_app: :debater_gambit,
    adapter: Ecto.Adapters.SQLite3
end
