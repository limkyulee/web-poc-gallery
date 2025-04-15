<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
    <h1 class="text-6xl font-bold text-imac-orange mb-4">404</h1>
    <p class="text-2xl text-gray-700 mb-2">Oops! Page not found 😢</p>
    <p class="text-gray-500 mb-6">The page you're looking for doesn’t exist or has been moved.</p>
    <RouterLink
      to="/"
      class="bg-imac-orange text-white px-6 py-2 rounded-full hover:bg-imac-orange-deep transition"
    >
      Go home
    </RouterLink>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: false
  </route>