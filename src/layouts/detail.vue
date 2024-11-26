<script setup ="ts">
import { RouterView } from 'vue-router';
import Header from '../components/layouts/Header.vue';

const router = useRouter()
const backToPage = () => {
  router.back()
}

const goToMain = () => {
  router.push('/')
}
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