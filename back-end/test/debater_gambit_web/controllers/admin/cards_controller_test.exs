defmodule DebaterGambitWeb.Admin.CardsControllerTest do
  use DebaterGambitWeb.ConnCase

  alias DebaterGambit.{Accounts, Cards}

  @admin_email "heri@studiozenkai.com"

  @valid_card %{
    card_id: "rc_t1",
    card_type: "case",
    title: "Test Card",
    description: "A test description.",
    difficulty: "EASY",
    icon: "🃏"
  }

  defp create_admin_user do
    {:ok, user} =
      Accounts.register_user(%{
        "email" => @admin_email,
        "name" => "Admin",
        "password" => "testpassword123"
      })
    user
  end

  defp admin_conn(conn) do
    admin = create_admin_user()

    conn
    |> Plug.Test.init_test_session(%{admin_user_id: admin.id})
    |> put_private(:plug_skip_csrf_protection, true)
  end

  # ── GET /admin/cards ───────────────────────────────────────────────────────

  describe "GET /admin/cards" do
    test "redirects unauthenticated requests to login", %{conn: conn} do
      conn = get(conn, ~p"/admin/cards")
      assert redirected_to(conn) == ~p"/admin/login"
    end

    test "renders cards table when authenticated", %{conn: conn} do
      {:ok, _} = Cards.create_card(@valid_card)
      conn = conn |> admin_conn() |> get(~p"/admin/cards")
      assert html_response(conn, 200) =~ "Test Card"
    end

    test "shows empty state when no cards exist", %{conn: conn} do
      conn = conn |> admin_conn() |> get(~p"/admin/cards")
      assert html_response(conn, 200) =~ "No cards yet"
    end

    test "shows both active and inactive cards", %{conn: conn} do
      {:ok, _} = Cards.create_card(@valid_card)
      {:ok, _} = Cards.create_card(@valid_card |> Map.merge(%{card_id: "rc_t2", title: "Card Two", status: "inactive"}))
      conn = conn |> admin_conn() |> get(~p"/admin/cards")
      html = html_response(conn, 200)
      assert html =~ "Test Card"
      assert html =~ "Card Two"
    end

    test "renders the logged-in admin email", %{conn: conn} do
      conn = conn |> admin_conn() |> get(~p"/admin/cards")
      assert html_response(conn, 200) =~ @admin_email
    end
  end

  # ── GET /admin/cards/new ───────────────────────────────────────────────────

  describe "GET /admin/cards/new" do
    test "redirects unauthenticated requests to login", %{conn: conn} do
      conn = get(conn, ~p"/admin/cards/new")
      assert redirected_to(conn) == ~p"/admin/login"
    end

    test "renders new card form when authenticated", %{conn: conn} do
      conn = conn |> admin_conn() |> get(~p"/admin/cards/new")
      html = html_response(conn, 200)
      assert html =~ "New Card"
      assert html =~ "Card ID"
      assert html =~ "Difficulty"
    end
  end

  # ── POST /admin/cards ──────────────────────────────────────────────────────

  describe "POST /admin/cards — valid data" do
    test "creates card and redirects to index", %{conn: conn} do
      conn =
        conn
        |> admin_conn()
        |> post(~p"/admin/cards", %{
          "card" => %{
            "card_id" => "rc_new1",
            "title" => "Brand New Card",
            "description" => "Some description here.",
            "difficulty" => "MEDIUM",
            "icon" => "🎯"
          }
        })

      assert redirected_to(conn) == ~p"/admin/cards"
    end

    test "persists the new card to the database", %{conn: conn} do
      conn
      |> admin_conn()
      |> post(~p"/admin/cards", %{
        "card" => %{
          "card_id" => "rc_new1",
          "title" => "Brand New Card",
          "description" => "Some description here.",
          "difficulty" => "MEDIUM",
          "icon" => "🎯"
        }
      })

      assert length(Cards.list_all_cards()) == 1
      assert Cards.list_all_cards() |> hd() |> Map.get(:card_id) == "rc_new1"
    end
  end

  describe "POST /admin/cards — invalid data" do
    test "re-renders form on missing required fields", %{conn: conn} do
      conn =
        conn
        |> admin_conn()
        |> post(~p"/admin/cards", %{"card" => %{}})

      assert html_response(conn, 200) =~ "New Card"
    end

    test "does not create a card on invalid data", %{conn: conn} do
      conn
      |> admin_conn()
      |> post(~p"/admin/cards", %{"card" => %{}})

      assert Cards.list_all_cards() == []
    end

    test "shows validation errors in the form", %{conn: conn} do
      conn =
        conn
        |> admin_conn()
        |> post(~p"/admin/cards", %{"card" => %{}})

      html = html_response(conn, 200)
      assert html =~ "can&#39;t be blank" or html =~ "can't be blank"
    end
  end

  # ── POST /admin/cards/:id/toggle ───────────────────────────────────────────

  describe "POST /admin/cards/:id/toggle" do
    test "toggles active card to inactive and redirects to index", %{conn: conn} do
      {:ok, card} = Cards.create_card(@valid_card)

      conn =
        conn
        |> admin_conn()
        |> post(~p"/admin/cards/#{card.id}/toggle")

      assert redirected_to(conn) == ~p"/admin/cards"
      assert Cards.get_card!(card.id).status == "inactive"
    end

    test "toggles inactive card to active", %{conn: conn} do
      {:ok, card} = Cards.create_card(Map.put(@valid_card, :status, "inactive"))

      conn
      |> admin_conn()
      |> post(~p"/admin/cards/#{card.id}/toggle")

      assert Cards.get_card!(card.id).status == "active"
    end

    test "redirects unauthenticated requests to login", %{conn: conn} do
      {:ok, card} = Cards.create_card(@valid_card)
      conn = post(conn, ~p"/admin/cards/#{card.id}/toggle")
      assert redirected_to(conn) == ~p"/admin/login"
    end
  end
end
