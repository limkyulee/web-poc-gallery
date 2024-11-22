<script lang="ts" setup>
import { useIntersect } from '../../composable/useInteraction';
import ComModal from './ComModal.vue';

const isShow = ref(true)
const mockData = ref<string[]>([]); // 목업 데이터 저장
const popupContentRef = ref<HTMLDivElement | null>(null)
// 목업 데이터 생성 함수
const generateMockData = (count: number) => {
  const newData = Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
  mockData.value.push(...newData);
};

const openToast = (val: number) => {
  return ElMessage(
    {
      message: `Approach an end point thresold - ${val}`,
      type: 'info',
      showClose: true,
    },
  )
}

const openAlert = () => {
  return  ElNotification({
    title: 'Info',
    message: 'Approach an end point',
    type: 'info',
  })
}

const targetRef = useIntersect(async (entry, observer) => {
  openAlert()
}, {
  root: popupContentRef.value
})

generateMockData(20);

const objectContentRef = ref<HTMLDivElement | null>(null)

const objectZeroTargetRef = useIntersect(async (entry, observer) => {
  openToast(0)
}, {
  root: objectContentRef.value,
  threshold: 0
})

const object30TargetRef = useIntersect(async (entry, observer) => {
  openToast(0.3)
}, {
  root: objectContentRef.value,
  threshold: 0.3
})

const object70TargetRef = useIntersect(async (entry, observer) => {
  openToast(0.7)
}, {
  root: objectContentRef.value,
  threshold: 0.7
})

const objectFullTargetRef = useIntersect(async (entry, observer) => {
  openToast(1)
}, {
  root: objectContentRef.value,
  threshold: 1.0
})

</script>

<template>
 <button class="button mt-10" @click="isShow = true">Click to open the Dialog</button>

  <ComModal 
    v-if="isShow"
    :visible-modal="isShow" 
    @close-modal="isShow = false"
  >
    <template #content>
      <div>
        <p>Scroll test</p>
      </div>
      <!-- [INFO] -->
      <!-- popupContentRef :: 
          핍업 내부 컨텐츠 영억으로 root 선을 지정을 위함 -->
      <div ref="popupContentRef" class="popup-content">
        <div class="content-item" v-for="item in mockData" :key="item">{{ item }}</div>
      <!-- 스크롤 끝 점 확인을 위한 Target 설정 -->
        <div ref="targetRef"/>
      </div>
      <div ref="objectContentRef" class="object-content">
        <p>Threshold test</p>
        <div class="w-20 h-20 bg-transparent"/>
        <div class="w-20 h-20 bg-transparent"/>
        <div class="flex flex-col gap-1">
          <div ref="objectFullTargetRef" class="w-20 h-20 bg-slate-800"/>
          <div ref="object70TargetRef" class="w-20 h-20 bg-slate-700"/>
          <div ref="object30TargetRef" class="w-20 h-20 bg-slate-600"/>
          <div ref="objectZeroTargetRef" class="w-20 h-20 bg-slate-500"/>
        </div>
      </div>
    </template>
  </ComModal>
</template>

<style scoped>
.popup-content {
  max-height: 300px; 
  overflow-y: auto;
}

.content-item {
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
}

.object-content{
  max-width: 300px;
  height: 100px;
  overflow: auto;
}
</style>