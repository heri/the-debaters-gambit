defmodule DebaterGambit.Accounts.UserToken do
  use Ecto.Schema
  import Ecto.Changeset

  @rand_size 32

  schema "user_tokens" do
    field :token, :string
    field :context, :string

    belongs_to :user, DebaterGambit.Accounts.User

    timestamps(type: :utc_datetime, updated_at: false)
  end

  def build_token(user, context \\ "api") do
    token = :crypto.strong_rand_bytes(@rand_size) |> Base.url_encode64(padding: false)

    %__MODULE__{}
    |> cast(%{token: token, context: context, user_id: user.id}, [:token, :context, :user_id])
    |> validate_required([:token, :context, :user_id])
    |> unique_constraint(:token)
  end
end
