<script>
  import { onMount } from "svelte";
  import GameCard from "$lib/components/GameCard.svelte";
  import { games } from "$lib/assets/games";

  let search = "";
  let favorites = [];
  let showFavorites = true;

  // Load favorites
  onMount(() => {
    const saved = localStorage.getItem("favorites");
    favorites = saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter((f) => f !== id);
    } else {
      favorites = [...favorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  $: filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  $: favoriteGames = games.filter((game) =>
    favorites.includes(game.id)
  );
</script>

<div class="p-8 space-y-10">

  <!-- Search Bar -->
  <div class="max-w-md">
    <input
      type="text"
      bind:value={search}
      placeholder="Search games..."
      class="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  </div>

  <!-- Favorites Section -->
  {#if favoriteGames.length > 0}
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white">Favorites</h2>
        <button
          on:click={() => (showFavorites = !showFavorites)}
          class="text-sm text-white/60 hover:text-white transition"
        >
          {showFavorites ? "Hide" : "Show"}
        </button>
      </div>

      {#if showFavorites}
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {#each favoriteGames as game}
            <GameCard
              {game}
              isFavorite={true}
              on:toggle={(e) => toggleFavorite(e.detail)}
            />
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  <!-- All Games -->
  <div>
    <h2 class="text-2xl font-bold text-white mb-4">All Games</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

      {#each filteredGames as game}
        <GameCard
          {game}
          isFavorite={favorites.includes(game.id)}
          on:toggle={(e) => toggleFavorite(e.detail)}
        />
      {/each}
    </div>
  </div>

</div>
