import Globe from 'globe.gl'

/**
 * Globe 셍성
 * 지연 접근을 방지하기 위해 controls 제어 시점마다 생성.
 * @returns globeRef
 */

export function useGlobe() {
  const globeRef = ref<HTMLCanvasElement | null>(null)
	const globe = Globe({
		animateIn: false	 // 초기 로딩 시, 애니메이션 미실행 
	}) 

	const setupCamera = () => {
		const camera = globe.camera()
		camera.position.set(0, 0, 380)
	}

	const setupControls = () => {
		const controls = globe.controls()
    controls.minDistance = 350 // 가까워질 수 있는 정도
    controls.maxDistance = 800  // 멀어질 수 있는 정도
    controls.autoRotate = true // 초기 로딩 시, 회전 여부 지정
    controls.autoRotateSpeed = 0.35; // 회전 속도
	}

	const initGlobe = () => {
		if(!globeRef.value) throw new Error("No globeRef")
			
		globe(globeRef.value)
			.globeImageUrl(new URL('@/assets/images/earth-blue-marble.jpg', import.meta.url).href)
			.bumpImageUrl(new URL('@/assets/images/earth-topology.png', import.meta.url).href)
			.width(window.innerWidth)
			.height(window.innerHeight)

		setupCamera()
		setupControls()
	}

	const handleGlobePOV = (lat: number, lng: number, autoRotate: boolean, altitude = 2.5) => {
		globe.pointOfView(
			{
				lat,
				lng,
				altitude
			},
			1000
		)
		globe.controls().autoRotate = autoRotate
	}

	const handleGlobeMove = (isMove = true) => {
		const controls = globe.controls()
		controls.autoRotate = isMove
	}

  onMounted(async() => {
		initGlobe()
  })

	const destroyGlobe = () => {
		globe.showGlobe(false)
		globe.showAtmosphere(false)
		globe.showGraticules(false)
		globeRef.value = null
	}

	onUnmounted(()=>{
		destroyGlobe()
	})

  return {
    globe,
   	globeRef,
		handleGlobePOV,
		handleGlobeMove
  }
}

