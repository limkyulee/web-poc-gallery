<script setup lang="ts">
const router = useRouter()

const moveToDetail = (id: string) => {
  router.push(`/infinity-scroll/${id}`)
}
</script>

<template>
  <div class="flex flex-col gap-2 h-100vh align-center">
    <p class="text-sm" @click="moveToDetail('wiki')"><b>W</b>iki<b class="text-md">&#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('page')"><b>P</b>age POC <b class="text-md">&#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('popup')"><b>P</b>opup POC<b class="text-md">&#8250;</b></p>
    <p class="text-sm" @click="moveToDetail('modal')"><b>A</b>Modal POC <b class="text-md">&#8250;</b></p>
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: main
</route>
