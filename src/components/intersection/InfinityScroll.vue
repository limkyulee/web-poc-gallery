<script lang="ts" setup>
import { useIntersect } from '../../composable/useInteraction';
import request from '../../composable/request';

const items = ref<{id: string, productName: string, description: string, price: string}[]>([])

const getInfinityMockData = async() => {
  try {
    const res = await request.get('/infinity')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const requestInfinityMockData = async(entry?: any,observer?: any) => {
  const res = await getInfinityMockData()
  if(res.length === 0){
    // [INFO]
    // unobserve ::
    // 실행 시, 관찰대상자가 root 선을 넘었을 경우 관찰 종료
    // 미실행 시, 위로 스크롤하면 이벤트 재활성화
    observer.unobserve(entry.target)
  }else {
    items.value = [...items.value, ...res];
  }
}

const targetRef = useIntersect(async (entry, observer) => {
  requestInfinityMockData(entry, observer)
 }, {
  // API 를 선출하기 위한 margin 설정
  rootMargin: '200px'
 })


 const init = async() => {
  const res = await getInfinityMockData()
  items.value = res
 }

init()
</script>

<template>
  <div class="card-container">
    <div 
      class="card" 
      v-for="(item, index) in items" 
      :key="`product-item-${index}`"
    >
      <!-- Image -->
      <img src="https://via.placeholder.com/100/000000" alt="Product Image" class="card-image" />
      <!-- Text -->
      <div class="card-content">
        <p class="card-title">{{ item.productName  }}{{ index + 1 }}</p>
        <p class="card-description">{{ item.description }}</p>
        <p class="card-price">{{ item.price }}</p>
      </div>
    </div>
    <!-- scroll endpoint target(관찰대상자)-->
    <div ref="targetRef"/>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  justify-content: center; /* 카드 정렬 */
  gap: 16px; /* 카드 간격 */
  max-width: 70%;
  margin: 0 auto;
}

.card {
  display: flex;
  align-items: center; /* 이미지와 텍스트 상단 맞춤 */
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 10px; /* 이미지와 텍스트 간격 */
  padding: 5px;
  flex: 1 1 calc(50% - 10px); /* 기본 두 열 레이아웃 */
  max-width: calc(50% - 10px); /* 카드 최대 너비 */
}

.card-image {
  width: 100px;
  height: 100px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 50%;
}

/* 텍스트 줄바꿈 처리 */
.card-title,
.card-price {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.card-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-title {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-price {
  font-size: 8px;
}

.card-description {
  font-size: 8px;
  color: #555;
  margin-bottom: 2px;
}

/* --- 반응형 디자인 --- */

/* 화면 너비가 768px 이하일 때 크기 축소 */
@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(100% - 16px); /* 한 줄로 배치 */
    max-width: calc(100% - 16px);
    padding: 5px; /* 패딩 줄이기 */
    gap: 10px; /* 내부 간격 축소 */
  }

  .card-image {
    width: 100px;
    height: 100px; /* 이미지 크기 축소 */
  }

  .card-title {
    font-size: 9px; /* 텍스트 크기 축소 */
  }

  .card-description {
    font-size: 7px; /* 텍스트 크기 축소 */
  }

  .card-price {
    font-size: 7px; /* 텍스트 크기 축소 */
  }
}
</style>