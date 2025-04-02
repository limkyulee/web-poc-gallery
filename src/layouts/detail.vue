<script setup ="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';

</script>

<template>
  <main>
    <section>
      <div>
        <Header />
      </div>
      <!-- Main Content -->
      <div class="p-5">
        <RouterView />
      </div>
    </section>
  </main>
 </template>

<style scoped>

</style>