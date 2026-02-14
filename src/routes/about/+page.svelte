<script>
  import { onMount } from "svelte";
  import { timeline } from "$lib/assets/timeline";

  let visible = [];

  onMount(() => {
    visible = timeline.map(() => false);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = +entry.target.dataset.index;
          visible[index] = true;
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll(".timeline-item").forEach((el) =>
      observer.observe(el)
    );
  });
</script>

<div class="min-h-screen px-6 py-20 max-w-6xl mx-auto text-white">

  <h1 class="text-4xl font-bold text-center mb-20">About This Project</h1>

  <div class="relative">

    <!-- Center Line -->
    <div class="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/20 -translate-x-1/2"></div>
  
    <div class="space-y-24">
      {#each timeline as item, i}
        <div
          class="timeline-item relative grid grid-cols-1 md:grid-cols-2 items-center"
          data-index={i}
        >
  
          <!-- LEFT COLUMN -->
          <div
            class={`transition-all duration-700 ease-out
              ${i % 2 === 0 ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}
              ${visible[i]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}`}
          >
            <div class="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl p-6 shadow-lg">
              <span class="text-sm text-white/40">{item.year}</span>
              <h3 class="text-xl font-semibold mt-1">{item.title}</h3>
              <p class="text-white/70 mt-2">{item.description}</p>
            </div>
          </div>
  
          <!-- CENTER DOT -->
          <div class="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow"></div>
  
        </div>
      {/each}
    </div>

  
  </div>

  <!-- Paragraph Section -->
  <div class="mt-28 max-w-3xl mx-auto text-center space-y-6">
    <h2 class="text-2xl font-bold">Our Mission</h2>
    <p class="text-white/70 leading-relaxed">
      This platform was built to create a clean, fast, and accessible space
      for browser gaming. The focus is on simplicity, performance, and
      constant improvement. As the library grows, the goal remains the same:
      make discovering and playing games effortless.
    </p>
  </div>

</div>
