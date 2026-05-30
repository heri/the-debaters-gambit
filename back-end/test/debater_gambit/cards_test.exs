defmodule DebaterGambit.CardsTest do
  use DebaterGambit.DataCase

  alias DebaterGambit.Cards
  alias DebaterGambit.Cards.RemoteCard

  @valid_attrs %{
    card_id: "rc_t1",
    card_type: "case",
    title: "Test Card Title",
    description: "A test description for the card.",
    difficulty: "EASY",
    icon: "🃏"
  }

  # ── RemoteCard.changeset/2 ─────────────────────────────────────────────────

  describe "RemoteCard.changeset/2 — valid data" do
    test "accepts all required fields" do
      changeset = RemoteCard.changeset(%RemoteCard{}, @valid_attrs)
      assert changeset.valid?
    end

    test "accepts all valid difficulties" do
      for diff <- ~w(EASY MEDIUM HARD) do
        cs = RemoteCard.changeset(%RemoteCard{}, Map.put(@valid_attrs, :difficulty, diff))
        assert cs.valid?, "expected valid for difficulty #{diff}"
      end
    end

    test "accepts both valid statuses" do
      for status <- ~w(active inactive) do
        cs = RemoteCard.changeset(%RemoteCard{}, Map.put(@valid_attrs, :status, status))
        assert cs.valid?, "expected valid for status #{status}"
      end
    end

    test "focus is optional" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :focus))
      assert cs.valid?
    end
  end

  describe "RemoteCard.changeset/2 — required fields" do
    test "requires card_id" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :card_id))
      assert "can't be blank" in errors_on(cs).card_id
    end

    test "requires title" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :title))
      assert "can't be blank" in errors_on(cs).title
    end

    test "requires description" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :description))
      assert "can't be blank" in errors_on(cs).description
    end

    test "requires difficulty" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :difficulty))
      assert "can't be blank" in errors_on(cs).difficulty
    end

    test "requires icon" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.delete(@valid_attrs, :icon))
      assert "can't be blank" in errors_on(cs).icon
    end
  end

  describe "RemoteCard.changeset/2 — inclusion validations" do
    test "rejects invalid difficulty" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.put(@valid_attrs, :difficulty, "EXTREME"))
      assert "is invalid" in errors_on(cs).difficulty
    end

    test "rejects invalid status" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.put(@valid_attrs, :status, "banned"))
      assert "is invalid" in errors_on(cs).status
    end

    test "rejects invalid card_type" do
      cs = RemoteCard.changeset(%RemoteCard{}, Map.put(@valid_attrs, :card_type, "move"))
      assert "is invalid" in errors_on(cs).card_type
    end
  end

  # ── Cards.create_card/1 ────────────────────────────────────────────────────

  describe "Cards.create_card/1" do
    test "creates a card with valid attrs" do
      assert {:ok, %RemoteCard{} = card} = Cards.create_card(@valid_attrs)
      assert card.card_id == "rc_t1"
      assert card.title == "Test Card Title"
      assert card.difficulty == "EASY"
    end

    test "defaults status to active" do
      {:ok, card} = Cards.create_card(@valid_attrs)
      assert card.status == "active"
    end

    test "defaults card_type to case when omitted" do
      {:ok, card} = Cards.create_card(Map.delete(@valid_attrs, :card_type))
      assert card.card_type == "case"
    end

    test "returns error changeset on missing required fields" do
      assert {:error, %Ecto.Changeset{}} = Cards.create_card(%{})
    end

    test "enforces unique card_id" do
      {:ok, _} = Cards.create_card(@valid_attrs)
      assert {:error, changeset} = Cards.create_card(@valid_attrs)
      assert "has already been taken" in errors_on(changeset).card_id
    end
  end

  # ── Cards.list_active_cards/0 ──────────────────────────────────────────────

  describe "Cards.list_active_cards/0" do
    test "returns empty list when no cards exist" do
      assert Cards.list_active_cards() == []
    end

    test "returns only active cards" do
      {:ok, active} = Cards.create_card(@valid_attrs)
      {:ok, _inactive} = Cards.create_card(
        @valid_attrs |> Map.merge(%{card_id: "rc_t2", status: "inactive"})
      )
      ids = Cards.list_active_cards() |> Enum.map(& &1.id)
      assert active.id in ids
      assert length(ids) == 1
    end

    test "orders by inserted_at ascending" do
      {:ok, first} = Cards.create_card(@valid_attrs)
      {:ok, second} = Cards.create_card(Map.put(@valid_attrs, :card_id, "rc_t2"))
      [a, b] = Cards.list_active_cards()
      assert a.id == first.id
      assert b.id == second.id
    end
  end

  # ── Cards.list_all_cards/0 ─────────────────────────────────────────────────

  describe "Cards.list_all_cards/0" do
    test "returns both active and inactive cards" do
      {:ok, _} = Cards.create_card(@valid_attrs)
      {:ok, _} = Cards.create_card(
        @valid_attrs |> Map.merge(%{card_id: "rc_t2", status: "inactive"})
      )
      assert length(Cards.list_all_cards()) == 2
    end

    test "returns empty list when no cards exist" do
      assert Cards.list_all_cards() == []
    end
  end

  # ── Cards.toggle_status/1 ─────────────────────────────────────────────────

  describe "Cards.toggle_status/1" do
    test "toggles active card to inactive" do
      {:ok, card} = Cards.create_card(@valid_attrs)
      assert card.status == "active"
      {:ok, toggled} = Cards.toggle_status(card)
      assert toggled.status == "inactive"
    end

    test "toggles inactive card to active" do
      {:ok, card} = Cards.create_card(Map.put(@valid_attrs, :status, "inactive"))
      assert card.status == "inactive"
      {:ok, toggled} = Cards.toggle_status(card)
      assert toggled.status == "active"
    end

    test "toggle is reflected in the database" do
      {:ok, card} = Cards.create_card(@valid_attrs)
      {:ok, _} = Cards.toggle_status(card)
      assert Cards.get_card!(card.id).status == "inactive"
    end
  end

  # ── Cards.cards_payload/0 ─────────────────────────────────────────────────

  describe "Cards.cards_payload/0" do
    test "returns version 1" do
      assert Cards.cards_payload().version == 1
    end

    test "returns empty case_cards list when no active cards" do
      assert Cards.cards_payload().case_cards == []
    end

    test "includes only active cards" do
      {:ok, _active} = Cards.create_card(@valid_attrs)
      {:ok, _inactive} = Cards.create_card(
        @valid_attrs |> Map.merge(%{card_id: "rc_t2", status: "inactive"})
      )
      payload = Cards.cards_payload()
      assert length(payload.case_cards) == 1
    end

    test "card in payload has all expected fields" do
      {:ok, _} = Cards.create_card(Map.put(@valid_attrs, :focus, "Animals"))
      [card] = Cards.cards_payload().case_cards
      assert card.id == "rc_t1"
      assert card.title == "Test Card Title"
      assert card.description == "A test description for the card."
      assert card.difficulty == "EASY"
      assert card.icon == "🃏"
      assert card.focus == "Animals"
    end

    test "payload has no database internal fields" do
      {:ok, _} = Cards.create_card(@valid_attrs)
      [card] = Cards.cards_payload().case_cards
      refute Map.has_key?(card, :inserted_at)
      refute Map.has_key?(card, :status)
    end
  end
end
