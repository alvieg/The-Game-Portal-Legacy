<script>
  // nothing needed
</script>

<style>
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer {
    display: inline-block;             /* allow gradient to fill text */
    white-space: nowrap;               /* prevent wrapping */
    background: linear-gradient(90deg, #FFD700 0%, #FFC700 20%, #FFB200 40%, #FFD633 60%, #FFC700 80%, #FFD700 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }
</style>

<div class="min-h-screen flex flex-col justify-center items-center ">
  <h1 class="text-center text-6xl md:text-8xl font-extrabold leading-tight">

    <!-- "Game Portal" in white -->
    <span class="text-white font-yellowtail">The Game Portal</span>
    <br>

    <!-- "Legacy" in Yellowtail with metallic shimmer -->
    <span class="font-orbitron shimmer">Legacy</span>

  </h1>
</div>
