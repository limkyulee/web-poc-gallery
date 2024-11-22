<script setup lang="ts">
import InfinityScroll from '../../components/intersection/InfinityScroll.vue';
import Popup from '../../components/intersection/Popup.vue';
import OptionCheck from '../../components/intersection/OptionCheck.vue';
import Modal from '../../components/intersection/Modal.vue';
const route = useRoute()

</script>

<template>
  <InfinityScroll v-if="route.params.id === 'infinity-scroll'" />
  <Popup v-else-if="route.params.id === 'popup'" />
  <Modal v-else-if="route.params.id === 'modal'" />
  <OptionCheck v-else-if="route.params.id === 'options-info'" />
  <div v-else>Not Ready</div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: detail
</route>
