<script setup lang="ts">
const router = useRouter()

const moveToDetail = (id: string) => {
  router.push(`/web-gl/${id}`)
}
</script>

<template>
  <div class="flex flex-col gap-2 h-100vh align-center">
    <p class="text-sm" @click="navigateToUpcoming(router)"><b>T</b>hree JS<b class="text-md"> &#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('globe')"><b>G</b>lobe.gl<b class="text-md"> &#8250;</b></p>
  </div>
</template>

<style scoped>
</style>
