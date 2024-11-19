<script setup ="ts">
</script>

<template>
  <div class="h-screen bg-black bg-opacity-70 text-white flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-4 bg-black bg-opacity-90">
      <nav class="text-lg font-semibold">Navigation</nav>
      <!-- Add more navigation items if needed -->
    </header>

    <!-- Main Content -->
    <div class="flex flex-1">
      <!-- Main Area -->
      <main class="flex-1 p-6">
        <slot name="main"></slot>
      </main>

      <!-- Side Panel -->
      <aside class="w-1/5 p-4 border-l border-white/30 bg-white/10">
        <slot name="sidebar"></slot>
      </aside>
    </div>
  </div>
</template>

<style scoped>
</style>