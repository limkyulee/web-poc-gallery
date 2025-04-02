import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import Stats  from 'three/examples/jsm/libs/stats.module.js';


export const lights = {
  ambient: new THREE.AmbientLight(0xFFFFFF, 2.5),
  spot: new THREE.SpotLight(0xFFFFFF, 100)
}

export const loaders = {
  texture: new THREE.TextureLoader(),
  ply: new PLYLoader(),
  mtl: new MTLLoader(),
  obj: new OBJLoader()
}

export const scene = new THREE.Scene();
// export const stats = new Stats()