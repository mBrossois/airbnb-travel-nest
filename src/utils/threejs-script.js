import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import testVertexShader from './shaders/test/vertex.glsl'
// import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereGeometry(15, 32, 32)

function getTexture(loader, url) {
    const texture = loader.load(url)
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = - 1;

    // Material
    const material = new THREE.MeshBasicMaterial( { 
        map: texture, 
        side: THREE.BackSide,
    } );

    material.map.minFilter = THREE.NearestFilter


    return material
}

// Load picture
const textureLoader = new THREE.TextureLoader()

const materials = {
    hallway: getTexture(textureLoader, "/static/images/3dImages/3dImageHallway.jpeg" ),
    office: getTexture(textureLoader, "/static/images/3dImages/3dImageOffice.jpeg" ),
    kitchen: getTexture(textureLoader, "/static/images/3dImages/3dImageKitchen.jpeg" ),
    livingRoomOne: getTexture(textureLoader, "/static/images/3dImages/3dImageLivingroomOne.jpeg" ),
    livingRoomTwo: getTexture(textureLoader, "/static/images/3dImages/3dImageLivingroomTwo.jpeg" ),
    bedroom: getTexture(textureLoader, "/static/images/3dImages/3dImageBedroom.jpeg" ),
    bathroomOne: getTexture(textureLoader, "/static/images/3dImages/3dImageBathroomOne.jpeg" ),
    bathroomTwo: getTexture(textureLoader, "/static/images/3dImages/3dImageBathroomTwo.jpeg" ),
    bathroomThree: getTexture(textureLoader, "/static/images/3dImages/3dImageBathroomThree.jpeg" ),
    bathroomFour: getTexture(textureLoader, "/static/images/3dImages/3dImageBathroomFour.jpeg" )
}

// Mesh
const mesh = new THREE.Mesh(geometry, materials.hallway)
scene.add(mesh)

const imagesNav = document.getElementById('imagesNav')
imagesNav.addEventListener('change', (event) => {
    mesh.material = materials[imagesNav.value]
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth / 1.2,
    height: window.innerHeight / 1.2
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.minDistance = 1
controls.maxDistance = 12
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()