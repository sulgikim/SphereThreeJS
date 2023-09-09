import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI() //debug panel, (open control, close control button on top of the website)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
                                //radius 
                                //widthsegments --> increasing this will have more smooth sphere
                                //heightsegments --> increasing this will have more smooth sphere

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture


material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material) // combination of geometry and material 
scene.add(sphere)

// Lights


//Light1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Light2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-0.5, 0.48, 0.5)
pointLight2.intensity = 7.3
scene.add(pointLight2)

//Debug panel for point light so cooooool 
// const light2 = gui.addFolder('Light 2')
// light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.1)
// light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.1)
// light2.add(pointLight2, 'intensity').min(-10).max(10).step(0.01)

//red object to show where the light is coming from 
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)


//Light3
const pointLight3 = new THREE.PointLight(0x69ff, 2)
pointLight3.position.set(0.5, -0.84, 0.2)
pointLight3.intensity = 7.3
scene.add(pointLight3)

// const light3 = gui.addFolder('Light 3')
// light3.add(pointLight3.position, 'x').min(-3).max(3).step(0.1)
// light3.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.1)
// light3.add(pointLight3, 'intensity').min(-10).max(10).step(0.01)

// //color panel 
// const light3Color = {
//     color: 0x69ff,
// } 

// light3.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//when window is resized
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
//field of view (how much you can see), aspect ratio
//most of the time, max(view) is 50 
//cuz it will be distorted as getting wider 
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true //make the background transparent instead of changing bgcolor to white 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


//interaction as mouse moving 
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX) // subtracting the half width to make the interaction more smoother
    mouseY = (event.clientY - windowY)
}

//interaction as scrolling down
window.addEventListener('scroll', updateSphere)

function updateSphere(event) {
    sphere.position.y = window.scrollY * 0.01
}



//rotation & add interaction 
const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    //Update interaction -- rotate as mouse moving
    sphere.rotation.y += .5 * (targetX - sphere.rotation.x)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    
    //Update interaction -- get closer as mouse moving
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()