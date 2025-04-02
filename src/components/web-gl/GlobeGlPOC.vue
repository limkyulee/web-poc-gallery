<script lang="ts" setup>
import * as THREE from 'three'
import { useGlobe } from '@/composables/web-gl/globegl/useGlobegl'

const { myGlobe, globeRef } = useGlobe()

const CLOUDS_IMG_URL = new URL('@/assets/images/clouds.png', import.meta.url).href; 
const CLOUDS_ROTATION_SPEED = 0.005

// 구름 텍스쳐를 만들어 globe 겉에 추가
const loader = new THREE.TextureLoader()
loader.load(
  CLOUDS_IMG_URL,
  function (texture) {
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(myGlobe.getGlobeRadius() * 1.05, 75, 75), // 구름 sphere 생성 - 지구 객체보다 조금 더 크게
      new THREE.MeshPhongMaterial({ map: texture, transparent: true }) // 구름 sphere 겉표면 텍스쳐 설정
    );
    myGlobe.scene().add(clouds);
    // 구름 shpere 회전 함수 실행
    (function rotateClouds() {
      clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
      requestAnimationFrame(rotateClouds);
    })()
})
</script>

<template>
  <div ref="globeRef" />
</template>

<style scoped>
</style>