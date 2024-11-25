<script setup lang="ts">
import Globe from '../../components/three-dimensional/GlobeGl.vue';
import Three from '../../components/three-dimensional/ThreeJs.vue';


const route = useRoute()

</script>

<template>
  <Three v-if="route.params.id === 'three'" />
  <Globe v-else-if="route.params.id === 'globe'" />
  <div v-else>Not Ready</div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: detail
</route>
