# Seeds for The Debater's Gambit.
# Run with: mix run priv/repo/seeds.exs

alias DebaterGambit.Cards

cards = [
  %{
    card_id: "rc1",
    card_type: "case",
    title: "Flying is better than breathing underwater",
    description: "Debate whether the ability to fly beats the ability to breathe underwater in every meaningful way.",
    difficulty: "EASY",
    icon: "🦅",
    focus: "Superpowers"
  },
  %{
    card_id: "rc2",
    card_type: "case",
    title: "Having a pet dragon is better than a robot",
    description: "Argue whether a living, fire-breathing companion beats a tireless mechanical servant.",
    difficulty: "EASY",
    icon: "🐉",
    focus: "Companions"
  },
  %{
    card_id: "rc3",
    card_type: "case",
    title: "Hide & Seek is the best game at recess",
    description: "Make the case that Hide & Seek outclasses every other recess game in fun, fairness, and creativity.",
    difficulty: "EASY",
    icon: "🙈",
    focus: "Games"
  },
  %{
    card_id: "rc4",
    card_type: "case",
    title: "It'd be better to be an elephant than a whale",
    description: "Argue the merits of life as an elephant versus life as a whale — size, habitat, society, and all.",
    difficulty: "MEDIUM",
    icon: "🐘",
    focus: "Animals"
  },
  %{
    card_id: "rc5",
    card_type: "case",
    title: "A home without rules is better than a home with rules",
    description: "Debate whether total freedom at home leads to a better life than structure and clear expectations.",
    difficulty: "MEDIUM",
    icon: "🏠",
    focus: "Society"
  },
  %{
    card_id: "rc6",
    card_type: "case",
    title: "Cake is a better dessert than ice cream",
    description: "Settle the eternal dessert debate: celebrate the case for cake over cold, creamy ice cream.",
    difficulty: "EASY",
    icon: "🎂",
    focus: "Food"
  },
  %{
    card_id: "rc7",
    card_type: "case",
    title: "It is cooler to live in an underwater city than a space station",
    description: "Argue whether an ocean city or an orbital space station is the superior futuristic home.",
    difficulty: "HARD",
    icon: "🌊",
    focus: "Future"
  }
]

Enum.each(cards, fn attrs ->
  case Cards.create_card(attrs) do
    {:ok, card} -> IO.puts("Seeded: #{card.card_id} — #{card.title}")
    {:error, _} -> IO.puts("Skipped (already exists): #{attrs.card_id}")
  end
end)
