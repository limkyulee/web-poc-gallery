<script lang="ts" setup>
import { ref } from 'vue';
import { useIntersect } from '../composable/useInteraction';

const items = ref(20)

const fetchInfinityMockData = () => {
  if(items.value > 30) return []
  items.value += 1
}

const targetRef = useIntersect(async (entry, observer) => {
  const res = await fetchInfinityMockData()
  if(res?.length === 0){
    console.log('stop intersecting')
    
    // [INFO]
    // unobserve ::
    // 실행 시, 관찰대상자가 root 선을 넘었을 경우 관찰 종료
    // 미실행 시, 위로 스크롤하면 이벤트 재활성화
    observer.unobserve(entry.target)
  }
 })

</script>

<template>
  <div class="card-container">
    <div 
      class="card" 
      v-for="(index) in items" 
      :key="index"
    >
      <!-- Image -->
      <img src="https://via.placeholder.com/100x100" alt="Product Image" class="card-image" />
      <!-- Text -->
      <div class="card-content">
        <p class="card-title">Product {{ index + 1 }}</p>
        <p class="card-description">This is a very detailed description that might be too long to fit in the card properly.</p>
        <p class="card-price">5,000원</p>
      </div>
    </div>

    <!-- scroll endpoint target(관찰대상자)-->
    <div  ref="targetRef"/>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: none;
  max-width: 80%;
  max-height: min-content;
  margin: 0 auto;
}

.card {
  display: flex;
  align-items: center; /* 이미지와 텍스트 상단 맞춤 */
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 16px; /* 이미지와 텍스트 간격 */
}

.card-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.card-content {
  max-width: 50%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.card-title,
.card-price {
  max-height: auto;
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
}

.card-price {
  font-size: 8px;
  color: #007bff;
}

.card-description {
  font-size: 8px;
  color: #555;
}
</style>