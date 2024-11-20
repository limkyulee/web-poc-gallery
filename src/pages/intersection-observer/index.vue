<script setup lang="ts">
const router = useRouter()

const moveToDetail = (id: string) => {
  router.push(`/intersection-observer/${id}`)
}
</script>

<template>
  <div class="flex flex-col gap-2 h-100vh align-center">
    <p class="text-sm" @click="moveToDetail('options-info')"><b>O</b>ptions Info <b class="text-md">&#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('infinity-scroll')"><b>I</b>nfinity Scroll <b class="text-md">&#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('popup')"><b>P</b>opup <b class="text-md">&#8250;</b></p>
    
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: main
</route>
