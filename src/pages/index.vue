<script setup lang="ts">
import dayjs from 'dayjs';

const router = useRouter()

const moveToPage = (path: string) => {
  router.push(path)
}

</script>

<template>  
  <div class="flex-col justify-center mt-10 mb-20">
    <p class="text-md mb-10">{{ dayjs().format('dddd, MMMM DD YYYY') }}</p>
    <p style="font-family: Borel-Regular; font-size: 44px; font-weight: bold;">Hello_World .</p>
  </div>
  
  <div class="flex-col h-full justify-start align-center">
    <h1 class="mb-5"><b>&#10043; Chapter</b></h1>
    <div class="flex justify-start gap-5">
      <button class="button" @click="moveToPage('/intersection-observer')">Scroll Interaction &#10024;</button>
      <button class="button" disabled>ThreeJS</button>
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: main
</route>
 