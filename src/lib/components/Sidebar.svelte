<script>
  import { Home, Gamepad2, Info, Mail, Settings } from 'lucide-svelte';

  const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Games', href: '/games', icon: Gamepad2 },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];
</script>

<nav class="fixed left-6 top-1/2 z-20 -translate-y-1/2 group">
  <div class="flex flex-col gap-2 w-14 group-hover:w-48 rounded-4xl py-3 px-1 group-hover:px-4 transition-all duration-200 ease-out bg-black/40 backdrop-blur-[12px] border border-white/10 shadow-xl overflow-visible">
    
    {#each links as link}
      <a href={link.href} class="flex items-center gap-3 px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">
        <!-- icon always visible -->
        <svelte:component this={link.icon} size={22} class="flex-shrink-0" />

        <!-- text only visible on hover -->
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {link.name}
        </span>
      </a>

    {/each}
  </div>
</nav>
