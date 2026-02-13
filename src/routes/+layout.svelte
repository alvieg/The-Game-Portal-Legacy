<script>
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import SpaceBackground from '$lib/components/SpaceBackground.svelte';
</script>

<div class="relative min-h-screen overflow-hidden bg-black text-white">
  <SpaceBackground />
  <Sidebar />

  <main class="relative z-10 ml-24 px-6 py-10">
    <slot />
  </main>
</div>
