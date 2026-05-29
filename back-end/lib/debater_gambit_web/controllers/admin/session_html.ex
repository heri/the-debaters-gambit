defmodule DebaterGambitWeb.Admin.SessionHTML do
  use DebaterGambitWeb, :html

  def new(assigns) do
    ~H"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Admin Login — The Debater's Gambit</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F1C; color: #E8DFC8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .card { background: #131728; border: 1px solid #1C2038; border-radius: 16px; padding: 40px; width: 100%; max-width: 400px; }
        .eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #2ECFB0; text-transform: uppercase; margin-bottom: 8px; }
        h1 { font-size: 26px; font-weight: 800; color: #F5C842; margin-bottom: 32px; }
        label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #6B7280; text-transform: uppercase; margin-bottom: 6px; }
        input { width: 100%; background: #0D0F1C; border: 1px solid #1C2038; border-radius: 10px; padding: 12px 14px; color: #E8DFC8; font-size: 15px; margin-bottom: 16px; outline: none; }
        input:focus { border-color: #2ECFB0; }
        button { width: 100%; background: #F5C842; color: #0D0F1C; font-size: 13px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; border: none; border-radius: 10px; padding: 14px; cursor: pointer; margin-top: 8px; }
        button:hover { background: #F0BC30; }
        .error { background: #1A0000; border: 1px solid #EF4444; border-radius: 10px; padding: 12px 14px; color: #FCA5A5; font-size: 13px; margin-bottom: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="eyebrow">The Debater's Gambit</div>
        <h1>Admin Login</h1>
        <%= if @error do %>
          <div class="error"><%= @error %></div>
        <% end %>
        <form method="post" action="/admin/login">
          <input type="hidden" name="_csrf_token" value={Phoenix.Controller.get_csrf_token()} />
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
          <button type="submit">Sign In →</button>
        </form>
      </div>
    </body>
    </html>
    """
  end
end
