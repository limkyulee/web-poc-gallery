<script setup ="ts">
import { RouterView } from 'vue-router';

const router = useRouter()
const backToPage = () => {
  router.back()
}

const goToMain = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="flex flex-2 items-center justify-between mx-5 mt-3">
      <nav class="text-lg text-semibold cursor-pointer" @click="backToPage">&#8249;</nav>
      <nav class="text-xs text-semibold cursor-pointer" @click="goToMain">@limkyulee / web-poc-gallery</nav>
    </header>
  </div>
</template>
 

<style scoped>

</style>