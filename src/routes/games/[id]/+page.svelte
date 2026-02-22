<script>
  import { page } from '$app/stores';
  import {games} from "$lib/assets/games"
  import { onMount } from 'svelte';

  let game;
  let embedUrl = '';
  let iframeEl;

  $: {
    const id = $page.params.id;
    game = games.find(g => g.slug === id);
  }

  onMount(() => {
    if (game?.url) {
      embedUrl = game.url.replace('{HTML_URL}', '/games');
    }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      iframeEl?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
</script>

{#if game}
  <div class="min-h-screen bg-black text-white flex flex-col">

    <!-- Header -->
    <div class="px-6 py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 class="text-3xl md:text-4xl font-bold">{game.name}</h1>
        <a
          href={game.authorLink}
          target="_blank"
          class="text-white/50 hover:text-white text-sm transition"
        >
          {game.author}
        </a>
      </div>

      <button
        on:click={toggleFullscreen}
        class="self-start md:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
      >
        Fullscreen
      </button>

    </div>

    <!-- Game Frame -->
    <div class="flex-1 flex justify-center items-center p-6">
      <div class="w-full max-w-6xl">

        <!-- Outer gradient shell -->
        <div class="relative rounded-3xl p-[2px] bg-gradient-to-br from-yellow-500/40 via-white/10 to-yellow-300/40 shadow-2xl">

          <!-- Inner glass panel -->
          <div class="rounded-3xl bg-black/80 backdrop-blur-md border border-white/10 overflow-hidden">

            <!-- Optional top window bar -->
            <div class="h-10 bg-white/5 border-b border-white/10 flex items-center px-4">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
            </div>

            <!-- Iframe -->
            <div class="aspect-video bg-black">
              <iframe
                bind:this={iframeEl}
                src={embedUrl}
                title={game.name}
                class="w-full h-full"
                allowfullscreen
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center bg-black text-white">
    <h1 class="text-2xl font-bold">Game Not Found</h1>
  </div>
{/if}
