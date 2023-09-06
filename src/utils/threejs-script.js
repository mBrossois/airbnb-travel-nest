import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Icon
const dragIcon = document.querySelector('.drag-icon')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereGeometry(15, 32, 32)
geometry.rotateY(-20)

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
    hallway: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016450/airbnb/3d-pictures/3dImageHallway_yya7my.jpg' ),
    office: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016952/airbnb/3d-pictures/3dImageOffice_ig9tug.jpg' ),
    kitchen: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016951/airbnb/3d-pictures/3dImageKitchen_raplmn.jpg' ),
    livingRoomOne: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016954/airbnb/3d-pictures/3dImageLivingroomOne_fe1evo.jpg' ),
    livingRoomTwo: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016952/airbnb/3d-pictures/3dImageLivingroomTwo_yyddas.jpg' ),
    bedroom: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016946/airbnb/3d-pictures/3dImageBedroom_lnrnny.jpg' ),
    bathroomOne: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016945/airbnb/3d-pictures/3dImageBathroomOne_lxwvrp.jpg' ),
    bathroomTwo: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016949/airbnb/3d-pictures/3dImageBathroomTwo_ktxj4o.jpg' ),
    bathroomThree: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016945/airbnb/3d-pictures/3dImageBathroomThree_zacrka.jpg' ),
    bathroomFour: getTexture(textureLoader, 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694016945/airbnb/3d-pictures/3dImageBathroomFour_bxkji2.jpg' )
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
    height: ( window.innerHeight - 100 ) / 1.2 
}

// Update drag icon placement
dragIcon.style = `margin-left: ${- sizes.width / 2 - ( 5 * 16 / 2 )}; margin-top: ${sizes.height - ( 6 * 16 )}`

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 1.2
    sizes.height = (window.innerHeight - 100 ) / 1.2 

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update drag icon placement
    dragIcon.style = `margin-left: ${- sizes.width / 2 - ( 5 * 16 / 2 )}; margin-top: ${sizes.height - ( 6 * 16 )}`

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