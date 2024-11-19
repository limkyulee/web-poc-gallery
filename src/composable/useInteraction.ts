import { ref, onMounted, onUnmounted } from 'vue';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

export const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {

  let observer: IntersectionObserver | null = null; // 관찰자
  const targetRef = ref<HTMLDivElement | null>(null); // 관찰대상자

  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {

      // [INFO]
      // isIntersccting :: 
      // 타켓 entry 가 root 선을 넘었는지 여부
      if (entry.isIntersecting) {
        console.log('Last target isShown')
        // entry(target) 이 root 영역 안으로 접근했을 시, 해당 함수 실행
        onIntersect(entry, observer)
      }
    })
  }

  onMounted(() => {
    if (!targetRef.value) return
    observer = new IntersectionObserver(callback, options)
    // 관찰자 - 관찰대상자 맵핑
    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return targetRef
}