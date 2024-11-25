import Globe from 'globe.gl'

export function useGlobe() {
  const globeRef = shallowRef<HTMLCanvasElement | null>(null)
	const myGlobe = Globe({
		animateIn: false	 // 초기 로딩 시, 애니메이션 미실행 
	}) 

	const handleLoadGlobe = () => {
		if (globeRef.value) {
			myGlobe(globeRef.value)
				.globeImageUrl(new URL('../assets/images/earth-blue-marble.jpg', import.meta.url).href)
				.bumpImageUrl(new URL('../assets/images/earth-topology.png', import.meta.url).href)
				// .atmosphereColor('#e96288')
				.width(window.innerWidth)
				.height(window.innerHeight)

			const camera = myGlobe.camera()
			const controls = myGlobe.controls()
			
    	controls.camera
			camera.position.set(0, 0, 380)

    	controls.minDistance = 350 // 가까워질 수 있는 정도
    	controls.maxDistance = 800  // 멀어질 수 있는 정도
    	controls.autoRotate = true // 초기 로딩 시, 회전 여부 지정
    	controls.autoRotateSpeed = 0.35; // 회전 속도
		}
	}

	// const createGlobeMarker = (corpData, onClickMarker: (data: IMarker) => void) => {
	// 	myGlobe.htmlElementsData(corpData).htmlElement((d: object) => {
	// 		const data = d as IMarker
	// 		const el = document.createElement('div')
	
	// 		// el.innerHTML = data.dispYn === 'Y' ? (data.corpTp === 'S' ? saleFavorMarker : productFavorMarker) : data.corpTp === 'S' ? newSaleSvg : newProductSvg
	// 		el.style.color = data.color
	// 		el.style.width = data.dispYn === 'Y' ? '20px' : `${data.size}px`
	// 		el.style.pointerEvents = 'auto'
	// 		el.style.cursor = 'pointer'
	// 		el.style.zIndex = '10'
			
	// 		el.onclick = (event: MouseEvent) => {
	// 			onClickMarker(data)
  //       event.stopPropagation()
	// 		}
	// 		return el
	// 	})
	// }

	const handleGlobeMoving = (lat: number, lng: number, autoRotate: boolean, altitude = 2.5) => {
		myGlobe.pointOfView(
			{
				lat,
				lng,
				altitude
			},
			1000
		)
		myGlobe.controls().autoRotate = autoRotate
	}

	const handleGlobeStop = () => {
		const controls = myGlobe.controls()
		controls.autoRotate = false
	}

	const handleGlobeStart = () => {
		const controls = myGlobe.controls()
		controls.autoRotate = true
	}

	const destroyGlobe = () => {
		globeRef.value = null
		// myGlobe.destroy()
	}

  const init = () => {
    handleLoadGlobe()
  }
  
	const showGlobe =(isShow = true)=>{
		myGlobe.showGlobe(isShow)
		const controls = myGlobe.controls()
		controls.autoRotate = isShow
    controls.autoRotateSpeed = 0.5;
		myGlobe.showAtmosphere(isShow)
		myGlobe.showGraticules(isShow)
	}

  onMounted(async() => {
		init()
  })

	onUnmounted(()=>{
		destroyGlobe()
	})

  return {
    myGlobe,
    // camera,
    // controls,
    globeRef,
		// createGlobeMarker,
		handleGlobeMoving,
    handleLoadGlobe,
		handleGlobeStop,
		handleGlobeStart,
		destroyGlobe,
    init,
		showGlobe
  }
}

