import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

interface ILoadPly {
  fileInfo: string,
  onUpdatePercent: (percent: number) => void
}

// export const isMesh = (obj: any): obj is THREE.Mesh => obj instanceof THREE.Mesh && obj.isMesh
// export const hasMaterial = (obj: any): obj is {
//   material: THREE.Material
// } => obj.material !== undefined

// Render
export function getRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  renderer.setPixelRatio(devicePixelRatio) 
  renderer.setSize(innerWidth, innerHeight)
  return renderer
}

// Control
export function getControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true; 
  controls.minDistance = 0.1
  controls.maxDistance = 1000
  // controls.maxPolarAngle = Math.PI / 2
  return controls
}

// Camera
export function getCamera(xPos = 0, yPos = 0 , zPos = 0) {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(xPos, yPos, zPos)
  return camera
}

// 3D Model Download
export async function download3DModelFile(inspectionSno: string, resultType: string){
  try {
    const result = await request.get(`/inspection/modelling-download/viewer/${inspectionSno}`, {
      params: {
        resultType
      },
      responseType: 'blob'
    })

    const url = URL.createObjectURL(new Blob([result.data]))
    
    return url
  } catch (error) {
    console.error(error)

    return ''
  }
}

// Geometry from Ply 
export function loadPlyModel({fileInfo, onUpdatePercent}:ILoadPly):Promise<THREE.BufferGeometry> {
  const loader:THREE.BufferGeometryLoader = loaders.ply

  return new Promise((resolve, reject) => {
    loader.load(
      fileInfo,
      async (geometry: THREE.BufferGeometry) => {
        geometry.computeVertexNormals()
        geometry.center()

        resolve(geometry)
      },
      (xhr: ProgressEvent) => {
        const percent = Math.floor((xhr.loaded / xhr.total) * 100)
        onUpdatePercent(percent)
      },
      (error) => {
        reject(error);  
      }
    );
  });
}

// ------------------ with obj & mtl file ------------------

// Material from Mtl
export function loadMtlMaterial(fileName: string){
  const loader = loaders.mtl

  return new Promise((resolve, reject) => {
    loader.load(`/user/textures/${fileName}`,
      (materials) => {
        materials.preload()

        resolve(materials)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

// Object from Obj
export function loadObjModel(fileName: string){
  const loader = loaders.obj

  return new Promise((resolve, reject) => {
    loader.load(
      `/user/models/obj/${fileName}`,
      (object) => {
        resolve(object)
      },
      (error) => {
        reject(error)
      }
    )
  })
}



// GUI
export function loadGUI(mesh: any, camera: THREE.Camera, isOpen?: boolean) {
  const gui = new GUI()
  const cubeFolder = gui.addFolder('Mesh')
  cubeFolder.add(mesh.position, 'x', -100, 100).name('X pos')
  cubeFolder.add(mesh.position, 'y', -100, 100).name('Y pos')
  cubeFolder.add(mesh.position, 'z', -100, 100).name('Z pos')
  cubeFolder.open()

  const cameraFolder = gui.addFolder('Camera')
  cameraFolder.add(camera.position, 'x', -50, 200, 0.01).name('X pos')
  cameraFolder.add(camera.position, 'y', -50, 200, 0.01).name('y pos')
  cameraFolder.add(camera.position, 'z', -50, 200, 0.01).name('z pos')
  cameraFolder.open()

  // camera.lookAt(mesh.position)

  gui.open(isOpen)
}
