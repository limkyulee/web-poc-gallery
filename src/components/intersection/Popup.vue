<script lang="ts" setup>
import { useIntersect } from '../../composable/useInteraction';

const isShow = ref(true)
const mockData = ref<string[]>([]); // 목업 데이터 저장
const popupContentRef = ref<HTMLDivElement | null>(null)
// 목업 데이터 생성 함수
const generateMockData = (count: number) => {
  const newData = Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
  mockData.value.push(...newData);
};

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
</script>

<template>
 <button class="button mt-10" @click="isShow = true">Click to open the Dialog</button>

 <!-- dialog -->
 <el-dialog
    v-model="isShow"
    title="Scroll Check"
    :close-on-click-modal="false"
    width="300"
  >
    <!-- [INFO] -->
    <!-- popupContentRef :: 
         핍업 내부 컨텐츠 영억으로 root 선을 지정을 위함 -->
    <div ref="popupContentRef" class="popup-content">
      <div class="content-item" v-for="item in mockData" :key="item">{{ item }}</div>
    <!-- 스크롤 끝 점 확인을 위한 Target 설정 -->
      <div ref="targetRef"/>
    </div>
  </el-dialog>
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
</style>