<script>
  function exportFavorites() {
    const favorites = localStorage.getItem("favorites") || "[]";
    const blob = new Blob([favorites], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "favorites.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function importFavorites(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        localStorage.setItem("favorites", JSON.stringify(data));
        alert("Favorites imported successfully.");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }

  function clearFavorites() {
    localStorage.removeItem("favorites");
    alert("Favorites cleared.");
  }

  function resetAll() {
    localStorage.clear();
    alert("All local data reset.");
  }
</script>

<div class="min-h-screen px-6 py-16 text-white flex justify-center">
  <div class="w-full max-w-xl bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl p-8 shadow-xl space-y-8">

    <h1 class="text-3xl font-bold text-center">Settings</h1>

    <!-- Export -->
    <div class="flex justify-between items-center">
      <span>Export Favorites</span>
      <button
        on:click={exportFavorites}
        class="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
      >
        Download JSON
      </button>
    </div>

    <!-- Import -->
    <div class="flex justify-between items-center">
      <span>Import Favorites</span>
      <label class="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition cursor-pointer">
        Upload JSON
        <input
          type="file"
          accept="application/json"
          class="hidden"
          on:change={importFavorites}
        />
      </label>
    </div>

    <!-- Clear Favorites -->
    <div class="flex justify-between items-center">
      <span>Clear Favorites</span>
      <button
        on:click={clearFavorites}
        class="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>

    <!-- Reset All -->
    <div class="flex justify-between items-center">
      <span>Reset All Local Data</span>
      <button
        on:click={resetAll}
        class="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
      >
        Reset
      </button>
    </div>

  </div>
</div>
