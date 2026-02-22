<script>
	import { Heart } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let game;
	export let isFavorite = false;
	const cover = game.cover?.replace('{COVER_URL}', '/images');

	const dispatch = createEventDispatcher();

	function toggleFavorite(e) {
		e.preventDefault();
		dispatch('toggle', game.id);
	}
</script>

<a
	href={`/games/${game.slug}`}
	class="relative bg-white/5 hover:bg-white/10 transition rounded-2xl p-4 flex flex-col gap-3 border border-white/10"
>
	<div class="w-full aspect-square overflow-hidden rounded-xl">
		<img src={cover} alt={game.name} class="w-full h-full object-cover" loading="lazy" />
	</div>

	<div class="flex justify-between items-start">
		<div>
			<h3 class="text-lg font-semibold text-white">{game.name}</h3>
			<p class="text-sm text-white/50">{game.author}</p>
		</div>

		<button on:click={toggleFavorite} class="p-2 rounded-full hover:bg-white/10 transition">
			<Heart size={20} class={isFavorite ? 'text-red-500 fill-red-500' : 'text-white/50'} />
		</button>
	</div>
</a>
