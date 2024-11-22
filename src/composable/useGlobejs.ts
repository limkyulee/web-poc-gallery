import type { IFavor, IMarker } from '@/types/cqis/globe'
import Globe from 'globe.gl'

export function useGlobe() {
  const globeRef = shallowRef<HTMLCanvasElement | null>(null)
	const myGlobe = Globe() 

	const handleLoadGlobe = () => {
		if (globeRef.value) {
			myGlobe(globeRef.value)
				.globeImageUrl(new URL('//unpkg.com/three-globe/example/img/earth-night.jpg', import.meta.url).href)
				.backgroundColor('rgb(0,0,0,0)')
				.atmosphereColor('#e96288')
				.width(1100)
				.height(1100)

			const camera = myGlobe.camera()
			camera.position.set(0, 0, 380)

			const controls = myGlobe.controls()
    	controls.camera
    	controls.minDistance = 350
    	controls.maxDistance = 800
    	controls.autoRotate = false
    	controls.autoRotateSpeed = 0.5;
		}
	}

	const createGlobeMarker = (corpData: IFavor[], onClickMarker: (data: IMarker) => void) => {
		myGlobe.htmlElementsData(corpData).htmlElement((d: object) => {
			const data = d as IMarker
			const el = document.createElement('div')
	
			// el.innerHTML = data.dispYn === 'Y' ? (data.corpTp === 'S' ? saleFavorMarker : productFavorMarker) : data.corpTp === 'S' ? newSaleSvg : newProductSvg
			el.style.color = data.color
			el.style.width = data.dispYn === 'Y' ? '20px' : `${data.size}px`
			el.style.pointerEvents = 'auto'
			el.style.cursor = 'pointer'
			el.style.zIndex = '10'
			
			el.onclick = (event: MouseEvent) => {
				onClickMarker(data)
        event.stopPropagation()
			}
			return el
		})
	}

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
		createGlobeMarker,
		handleGlobeMoving,
    handleLoadGlobe,
		handleGlobeStop,
		handleGlobeStart,
		destroyGlobe,
    init,
		showGlobe
  }
}

