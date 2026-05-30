defmodule DebaterGambitWeb.API.CardsControllerTest do
  use DebaterGambitWeb.ConnCase

  alias DebaterGambit.Cards

  @valid_card %{
    card_id: "rc_t1",
    card_type: "case",
    title: "Test Card",
    description: "A test description.",
    difficulty: "EASY",
    icon: "🃏"
  }

  # ── GET /api/cards ─────────────────────────────────────────────────────────

  describe "GET /api/cards" do
    test "returns 200 with version and case_cards", %{conn: conn} do
      {:ok, _} = Cards.create_card(@valid_card)
      conn = get(conn, ~p"/api/cards")
      assert %{"version" => 1, "case_cards" => cards} = json_response(conn, 200)
      assert length(cards) == 1
    end

    test "returns empty case_cards list when no active cards", %{conn: conn} do
      conn = get(conn, ~p"/api/cards")
      assert %{"version" => 1, "case_cards" => []} = json_response(conn, 200)
    end

    test "excludes inactive cards from response", %{conn: conn} do
      {:ok, _} = Cards.create_card(@valid_card)
      {:ok, inactive} = Cards.create_card(
        @valid_card |> Map.merge(%{card_id: "rc_t2", status: "inactive"})
      )
      conn = get(conn, ~p"/api/cards")
      %{"case_cards" => cards} = json_response(conn, 200)
      ids = Enum.map(cards, & &1["id"])
      assert "rc_t1" in ids
      refute inactive.card_id in ids
    end

    test "each card has id, title, description, difficulty, icon, focus fields", %{conn: conn} do
      {:ok, _} = Cards.create_card(Map.put(@valid_card, :focus, "Animals"))
      conn = get(conn, ~p"/api/cards")
      %{"case_cards" => [card]} = json_response(conn, 200)
      assert card["id"] == "rc_t1"
      assert card["title"] == "Test Card"
      assert card["description"] == "A test description."
      assert card["difficulty"] == "EASY"
      assert card["icon"] == "🃏"
      assert card["focus"] == "Animals"
    end

    test "does not expose internal db fields", %{conn: conn} do
      {:ok, _} = Cards.create_card(@valid_card)
      conn = get(conn, ~p"/api/cards")
      %{"case_cards" => [card]} = json_response(conn, 200)
      refute Map.has_key?(card, "status")
      refute Map.has_key?(card, "inserted_at")
    end

    test "requires no authentication", %{conn: conn} do
      conn = get(conn, ~p"/api/cards")
      assert json_response(conn, 200)
    end
  end
end
