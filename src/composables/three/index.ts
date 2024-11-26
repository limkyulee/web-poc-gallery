import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

interface ThreeProps {
  modelType: string
  inspectionSno?: string
  mtlPath?: string
  objPath?: string
  useGui?: boolean
  useAxesHelper?: boolean
  useGridHelper?: boolean
  useStats?: boolean
}

export function useThree(props: ThreeProps) {
  let renderer: THREE.WebGLRenderer | null = null 
  let camera: THREE.PerspectiveCamera | null = null
  // let mesh = ref<THREE.Mesh | null>(null)
  let model: THREE.Mesh | THREE.Points |null = null
  let controls: OrbitControls | null = null
  const canvasRef = shallowRef<HTMLCanvasElement>()
  const loadingPercentage = ref(0)

  // 반복 실행
  const draw = () => {
    if (renderer && camera) 
      renderer.render(scene, camera)
    
    requestAnimationFrame(draw)
    // if(props.useStats && stats){
    //   stats.update()
    // }
  } 

  // 화면 비율 변화에 따른 카메리 및 렌더 재설정
  const setSizeProcess = () => {
    if (camera) {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      if (renderer) {
        renderer.setPixelRatio(devicePixelRatio) 
        renderer.setSize(innerWidth, innerHeight)
        renderer.render(scene, camera)
      }
    }
  }

  // mesh 생성
  const createMeshToPly = async(fileInfo: string): Promise<THREE.Mesh> => {
    let plyModel: THREE.BufferGeometry | undefined;

    try {
      plyModel = await loadPlyModel({
        fileInfo,
        onUpdatePercent: (percent: number) => {
          loadingPercentage.value = percent
        }
      })
    } catch (error) {
      console.error('model is not loaded', error)      
    }

    if(!plyModel?.hasAttribute('color')) throw Error('no Vertex colors to make texture')

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true
    })

    if(!material) throw Error('cannot create material')

    const mesh = new THREE.Mesh(plyModel, material)

    return mesh
  }

   // pointCloud 생성
   const createPointCloudToPly = async(fileInfo: string): Promise<THREE.Points> => {
    let plyModel: THREE.BufferGeometry | undefined;

    try {
      plyModel = await loadPlyModel({
        fileInfo,
        onUpdatePercent: (percent: number) => {
          loadingPercentage.value = percent
        }
      })
    } catch (error) {
      console.error('model is not loaded', error)      
    }

    if(!plyModel?.hasAttribute('color')) throw Error('no Vertex colors to make texture')

    const material = new THREE.PointsMaterial({
      size: 0.001,
      alphaTest: 0.5,
      vertexColors: true
    })

    if(!material) throw Error('cannot create material')

    const pointCloud = new THREE.Points(plyModel, material)

    return pointCloud
  }

  const init = async () => {
    // 재조회 시 scene 초기화
    scene.clear();

    // Background Canvas
    if (!canvasRef.value) return
    const canvas = canvasRef.value

    // Render
    renderer = getRenderer(canvas)

    // Mesh from ply
    if(!props.inspectionSno && !props.modelType) return

    const fileInfo = await download3DModelFile(props.inspectionSno!, props.modelType!)

    if (!fileInfo) {
      loadingPercentage.value = 100
      ElNotification({
        title: 'No file to load'
      })
      return 
    }

    if(props.modelType === 'mesh'){
      model = await createMeshToPly(fileInfo);
    }else {
      model = await createPointCloudToPly(fileInfo)
    }

    if (!model) throw Error('mesh is not loaded')

    scene.add(model);

    // Camera
    camera = getCamera(0, -1, 0);
    camera.lookAt(model.position)

    if (!camera) throw Error('camera is not exist')

    scene.add(camera!)

    // Light
    scene.add(lights.ambient)

    // Control
    controls = getControls(camera, renderer!); 
    controls.update();

    // Require init fn
    draw()
    window.addEventListener('resize', setSizeProcess) // 확대 축소 감지 이벤트 설정

    // GUI
    // if (props.useGui && mesh && camera) {
    //   loadGUI(mesh, camera, false)
    // }

    // AxesHelper
    if (props.useAxesHelper) {
      const axesHelper = new THREE.AxesHelper(5) // helper 축 길이 설정 가능
      axesHelper.position.set(0,0,1) // helper 위치 변경
      scene.add(axesHelper)
    }

    // GridHelper
    // if (props.useGridHelper) {
    //   const gridHelper = new THREE.GridHelper(5)
    //   scene.add(gridHelper)
    // }

    // Stats
    // if(props.useStats){
    //   if(!stats.dom) throw Error('no stats dom')
    //   document.body.appendChild(stats.dom) 
    // }
  }
  
  onMounted(() => {
    init()
  })

  return {
    THREE,
    lights,
    loaders,
    scene,
    // stats,
    canvasRef,
    loadingPercentage,
    createMeshToPly,
    init,
  }
}

