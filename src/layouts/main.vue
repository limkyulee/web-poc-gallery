<script setup ="ts">
import { RouterView } from 'vue-router';

const router = useRouter()
const goToMain = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-screen">
    <!-- Header -->
    <header class="flex items-center justify-start gap-5 p-5">
      <nav class="text-xs text-semibold cursor-pointer" @click="goToMain">@limkyulee / web-poc-gallery</nav>
    </header>

    <!-- Main Content -->
     <div class="p-5">
      <RouterView />
     </div>
  </div>
</template>

<style scoped>
</style>