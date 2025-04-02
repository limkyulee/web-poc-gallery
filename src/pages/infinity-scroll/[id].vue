<script setup lang="ts">
import PagePOC from '@/components/infinity-scroll/PagePOC.vue';
import PopupPOC from '@/components/infinity-scroll/PopupPOC.vue';
import ModalPOC from '@/components/infinity-scroll/ModalPOC.vue';
import Wiki from '@/components/infinity-scroll/Wiki.vue';

const route = useRoute()
</script>

<template>
  <PagePOC v-if="route.params.id === 'page'" />
  <PopupPOC v-else-if="route.params.id === 'popup'" />
  <ModalPOC v-else-if="route.params.id === 'modal'" />
  <Wiki v-else-if="route.params.id === 'wiki'" />
  <div v-else>Not Ready</div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: detail
</route>
