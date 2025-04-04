<script setup lang="ts">
import gsap from 'gsap'

const boxMainRef = ref()
let boxTl: gsap.core.Timeline;
let bocCtx: gsap.Context;

const circleMainRef = ref()
let circleTl: gsap.core.Timeline;
let circleCtx: gsap.Context;

const toogleBoxTimeline = () => {
  boxTl.reversed(!boxTl.reversed())
}

const toogleCircleTimeline = () => {
  circleTl.reversed(!circleTl.reversed())
}

/**
 * .gsap.to()
 * x : 위치 이동 정도
 * ratation : 회전 정도
 * duration: 진행 속도
 */

const createBoxAnimation = () => {
  bocCtx = gsap.context((self) => {
      const boxes: EventTarget[] = gsap.utils.toArray('.box');
      
      // 타임라인 생성
      boxTl = gsap.timeline()
      // 애니메이션 체이닝 | 순서대로 애니메이션 재생
      boxTl
        .to(boxes[0], {x: 120, rotation: 360})
        .to(boxes[1], {x: -120, rotation: -360})
        .to(boxes[2], {y: -166})
        .to(boxes[3], {rotation: 360, x: 100, duration: 2})
        .reverse()
   }, boxMainRef.value)
}

/**
 * .gsap.from()
 * opacity : 초기에 화면 노출 여부 | 0 (보이지않음)
 * duration : 진행 속도
 * stagger: 각 요소 등장 타이밍 | 숫자가 커질수로 전 요소 동작 끝난 후 등장
 */

const createCircleAnimation = () => {
  circleCtx = gsap.context((self) => {
      // 타임라인 생성
      circleTl = gsap.timeline()
      // 애니메이션 체이닝 | 순서대로 애니메이션 재생
      circleTl
        .from('.circle', {
          y: "random(-150, 150)",
          opacity: 0, 
          duration: 1,
          stagger: 0.2
        })
        .reverse()
   }, circleMainRef.value)
}

onMounted(() => {
  createBoxAnimation()
  createCircleAnimation()
})

onUnmounted(() => {
  bocCtx.revert()
  circleCtx.rever()
})
</script>

<template>
  <div>
    <!-- gsap.to() example -->
    <section ref="boxMainRef">
      <div class="label-form">
        <label>GSAP.to()</label>
        <button class="button" @click="toogleBoxTimeline">Active</button>
      </div>
      
      <div class="box-container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
        <div class="box">Box 4</div>
      </div>
    </section>

    <!-- gsap.from() example -->
    <section ref="circleMainRef">
      <div class="label-form">
        <label>GSAP.from()</label>
        <button class="button" @click="toogleCircleTimeline">Active</button>
      </div>
      
        <div class="circle-container">
          <div v-for="i in 5" :key="i" class="circle" />
        </div>
    </section>
  </div>
</template>

<style lang="css" scoped>

.label-form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  label{
    font-weight: 600;
    font-size: var(--text-lg);
    margin-right: 10px;
  }
}

.box-container{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 400px;
}

.box{
  width: 70px;
  height: 70px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-imac-green);
  color: white;
  font-weight: 500;
}

.circle-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 200px;
}

.circle{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--color-imac-pink);
}
</style>

