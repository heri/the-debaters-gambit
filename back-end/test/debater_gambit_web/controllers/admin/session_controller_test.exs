defmodule DebaterGambitWeb.Admin.SessionControllerTest do
  use DebaterGambitWeb.ConnCase

  alias DebaterGambit.Accounts

  @admin_email "heri@studiozenkai.com"
  @admin_password "testpassword123"

  defp create_admin_user do
    {:ok, user} =
      Accounts.register_user(%{
        "email" => @admin_email,
        "name" => "Admin",
        "password" => @admin_password
      })
    user
  end

  defp skip_csrf(conn), do: put_private(conn, :plug_skip_csrf_protection, true)

  # ── GET /admin/login ───────────────────────────────────────────────────────

  describe "GET /admin/login" do
    test "renders login form", %{conn: conn} do
      conn = get(conn, ~p"/admin/login")
      assert html_response(conn, 200) =~ "Admin Login"
    end

    test "renders email and password fields", %{conn: conn} do
      conn = get(conn, ~p"/admin/login")
      html = html_response(conn, 200)
      assert html =~ ~s(name="email")
      assert html =~ ~s(name="password")
    end
  end

  # ── POST /admin/login ──────────────────────────────────────────────────────

  describe "POST /admin/login — valid admin credentials" do
    setup do
      {:ok, admin: create_admin_user()}
    end

    test "sets admin_user_id in session and redirects to cards", %{conn: conn} do
      conn =
        conn
        |> skip_csrf()
        |> post(~p"/admin/login", %{"email" => @admin_email, "password" => @admin_password})

      assert redirected_to(conn) == ~p"/admin/cards"
      assert get_session(conn, :admin_user_id)
    end
  end

  describe "POST /admin/login — invalid credentials" do
    setup do
      {:ok, admin: create_admin_user()}
    end

    test "wrong password renders error", %{conn: conn} do
      conn =
        conn
        |> skip_csrf()
        |> post(~p"/admin/login", %{"email" => @admin_email, "password" => "wrongpassword"})

      assert html_response(conn, 200) =~ "Invalid email or password"
    end

    test "non-admin email (valid user, no admin access) renders error", %{conn: conn} do
      {:ok, _} =
        Accounts.register_user(%{
          "email" => "other@example.com",
          "name" => "Other",
          "password" => "password123"
        })

      conn =
        conn
        |> skip_csrf()
        |> post(~p"/admin/login", %{"email" => "other@example.com", "password" => "password123"})

      assert html_response(conn, 200) =~ "admin access"
    end

    test "unknown email renders error", %{conn: conn} do
      conn =
        conn
        |> skip_csrf()
        |> post(~p"/admin/login", %{"email" => "nobody@example.com", "password" => "anything"})

      assert html_response(conn, 200) =~ "Invalid email or password"
    end

    test "does not set session on failure", %{conn: conn} do
      conn =
        conn
        |> skip_csrf()
        |> post(~p"/admin/login", %{"email" => @admin_email, "password" => "wrong"})

      refute get_session(conn, :admin_user_id)
    end
  end

  # ── DELETE /admin/logout ───────────────────────────────────────────────────

  describe "DELETE /admin/logout" do
    test "clears session and redirects to login", %{conn: conn} do
      admin = create_admin_user()

      conn =
        conn
        |> Plug.Test.init_test_session(%{admin_user_id: admin.id})
        |> skip_csrf()
        |> delete(~p"/admin/logout")

      assert redirected_to(conn) == ~p"/admin/login"
      refute get_session(conn, :admin_user_id)
    end
  end
end
