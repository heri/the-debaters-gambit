defmodule DebaterGambitWeb.Admin.CardsHTML do
  use DebaterGambitWeb, :html

  @difficulties ~w(EASY MEDIUM HARD)

  defp layout(assigns, do: inner) do
    assigns = assign(assigns, :inner, inner)

    ~H"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Admin — The Debater's Gambit</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F1C; color: #E8DFC8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; }
        a { color: #2ECFB0; text-decoration: none; }
        a:hover { text-decoration: underline; }

        .topbar { background: #131728; border-bottom: 1px solid #1C2038; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
        .topbar-brand { font-size: 13px; font-weight: 800; letter-spacing: 1.5px; color: #F5C842; text-transform: uppercase; }
        .topbar-right { display: flex; align-items: center; gap: 20px; font-size: 12px; color: #6B7280; }

        .container { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
        .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        h1 { font-size: 22px; font-weight: 800; color: #E8DFC8; }

        .flash { background: #0A1A10; border: 1px solid #2ECFB0; border-radius: 10px; padding: 12px 16px; color: #2ECFB0; font-size: 13px; margin-bottom: 20px; }

        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #6B7280; text-transform: uppercase; padding: 0 12px 12px; border-bottom: 1px solid #1C2038; }
        td { padding: 14px 12px; border-bottom: 1px solid #1C2038; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #131728; }

        .badge { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }
        .badge-active { background: #052A14; color: #4ADE80; border: 1px solid #4ADE80; }
        .badge-inactive { background: #1A0000; color: #F87171; border: 1px solid #F87171; }
        .badge-easy { color: #4ADE80; }
        .badge-medium { color: #F5C842; }
        .badge-hard { color: #F87171; }

        .btn { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 7px 14px; border-radius: 8px; border: none; cursor: pointer; text-decoration: none; }
        .btn-primary { background: #F5C842; color: #0D0F1C; }
        .btn-primary:hover { background: #F0BC30; text-decoration: none; }
        .btn-ghost { background: transparent; color: #6B7280; border: 1px solid #1C2038; }
        .btn-ghost:hover { border-color: #6B7280; color: #E8DFC8; text-decoration: none; }
        .btn-danger { background: transparent; color: #F87171; border: 1px solid #F87171; }
        .btn-danger:hover { background: #1A0000; text-decoration: none; }
        .btn-success { background: transparent; color: #4ADE80; border: 1px solid #4ADE80; }
        .btn-success:hover { background: #052A14; text-decoration: none; }

        .icon { font-size: 22px; }
        .card-id { font-family: monospace; font-size: 12px; color: #6B7280; }
        .title { font-weight: 600; color: #E8DFC8; }
        .description { color: #9CA3AF; font-size: 12px; max-width: 340px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .focus-tag { font-size: 11px; color: #A78BFA; }
        .empty { text-align: center; padding: 60px 0; color: #6B7280; }
      </style>
    </head>
    <body>
      <div class="topbar">
        <span class="topbar-brand">🃏 Debater's Gambit Admin</span>
        <div class="topbar-right">
          <span><%= @admin_user.email %></span>
          <form method="post" action="/admin/logout" style="display:inline">
            <input type="hidden" name="_csrf_token" value={Phoenix.Controller.get_csrf_token()} />
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" style="background:none;border:none;color:#6B7280;cursor:pointer;font-size:12px;padding:0">Sign out</button>
          </form>
        </div>
      </div>
      <div class="container">
        <%= @inner %>
      </div>
    </body>
    </html>
    """
  end

  def index(assigns) do
    ~H"""
    <%= layout assigns do %>
      <div class="page-header">
        <h1>Remote Cards</h1>
        <a href="/admin/cards/new" class="btn btn-primary">+ New Card</a>
      </div>

      <%= if msg = Map.get(assigns[:flash] || %{}, "info") do %>
        <div class="flash"><%= msg %></div>
      <% end %>

      <%= if Enum.empty?(@cards) do %>
        <div class="empty">No cards yet. Create one above.</div>
      <% else %>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Focus</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <%= for card <- @cards do %>
              <tr>
                <td><span class="icon"><%= card.icon %></span></td>
                <td><span class="card-id"><%= card.card_id %></span></td>
                <td>
                  <div class="title"><%= card.title %></div>
                  <div class="description"><%= card.description %></div>
                </td>
                <td>
                  <span class={"badge-#{String.downcase(card.difficulty)}"}>
                    <%= card.difficulty %>
                  </span>
                </td>
                <td><span class="focus-tag"><%= card.focus %></span></td>
                <td>
                  <span class={"badge badge-#{card.status}"}>
                    <%= card.status %>
                  </span>
                </td>
                <td>
                  <form method="post" action={"/admin/cards/#{card.id}/toggle"} style="display:inline">
                    <input type="hidden" name="_csrf_token" value={Phoenix.Controller.get_csrf_token()} />
                    <button type="submit" class={"btn #{if card.status == "active", do: "btn-danger", else: "btn-success"}"}>
                      <%= if card.status == "active", do: "Deactivate", else: "Activate" %>
                    </button>
                  </form>
                </td>
              </tr>
            <% end %>
          </tbody>
        </table>
      <% end %>
    <% end %>
    """
  end

  def new(assigns) do
    assigns = assign_new(assigns, :difficulties, fn -> @difficulties end)

    ~H"""
    <%= layout assigns do %>
      <div class="page-header">
        <h1>New Card</h1>
        <a href="/admin/cards" class="btn btn-ghost">← Back</a>
      </div>

      <%= if @errors do %>
        <div class="flash" style="background:#1A0000;border-color:#EF4444;color:#FCA5A5;margin-bottom:20px">
          <%= for {field, msgs} <- @errors do %>
            <div><strong><%= field %>:</strong> <%= Enum.join(msgs, ", ") %></div>
          <% end %>
        </div>
      <% end %>

      <div style="background:#131728;border:1px solid #1C2038;border-radius:16px;padding:32px;max-width:600px">
        <form method="post" action="/admin/cards">
          <input type="hidden" name="_csrf_token" value={Phoenix.Controller.get_csrf_token()} />

          <div style="margin-bottom:20px">
            <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Card ID <span style="color:#F87171">*</span></label>
            <input type="text" name="card[card_id]" placeholder="rc8" required
              style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:14px;font-family:monospace;outline:none" />
            <div style="font-size:11px;color:#6B7280;margin-top:4px">Unique identifier. Use format: rc8, rc9, etc.</div>
          </div>

          <div style="margin-bottom:20px">
            <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Icon <span style="color:#F87171">*</span></label>
            <input type="text" name="card[icon]" placeholder="🃏" required maxlength="8"
              style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:22px;outline:none" />
          </div>

          <div style="margin-bottom:20px">
            <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Title <span style="color:#F87171">*</span></label>
            <input type="text" name="card[title]" placeholder="Cake is better than ice cream" required
              style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:14px;outline:none" />
          </div>

          <div style="margin-bottom:20px">
            <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Description <span style="color:#F87171">*</span></label>
            <textarea name="card[description]" rows="3" placeholder="One to two sentences describing both sides of the debate." required
              style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:14px;resize:vertical;outline:none;font-family:inherit"></textarea>
          </div>

          <div style="display:flex;gap:16px;margin-bottom:20px">
            <div style="flex:1">
              <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Difficulty <span style="color:#F87171">*</span></label>
              <select name="card[difficulty]" required
                style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:14px;outline:none;appearance:none">
                <option value="">Select...</option>
                <%= for d <- @difficulties do %>
                  <option value={d}><%= d %></option>
                <% end %>
              </select>
            </div>
            <div style="flex:1">
              <label style="display:block;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6B7280;text-transform:uppercase;margin-bottom:6px">Focus <span style="color:#9CA3AF">(optional)</span></label>
              <input type="text" name="card[focus]" placeholder="Food, Animals, Society..."
                style="width:100%;background:#0D0F1C;border:1px solid #1C2038;border-radius:10px;padding:11px 14px;color:#E8DFC8;font-size:14px;outline:none" />
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;padding:14px;font-size:13px">
            Create Card →
          </button>
        </form>
      </div>
    <% end %>
    """
  end
end
