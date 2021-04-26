import * as THREE from  './pkg/three.module.js';
import { AmmoPhysics } from './pkg/AmmoPhysics.js';

window.addEventListener('DOMContentLoaded', async DOMContentLoaded => {

    //Init
    const physics = await AmmoPhysics(); 
    const renderer = new THREE.webGL1Renderer({canvas: document.querySelector('canvas') });
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    renderer.SetPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x88AAFF);
    const camera = new THREE.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    //Lights
    const dir_Light = new THREE.DirectionalLight(0xFFFFFF, 1);
    dir_Light.position.x = 3;
    dir_Light.position.y = 4;
    dir_Light.position.z = 5;
    dir_Light.castShadow = true;
    scene.add(dir_Light);

    //Ground
    const ground_Geo = new THREE.BoxGeometry(20, 1, 30);
    const ground_material = new THREE.MeshStandardMaterial({
        color: 0x44AA88,
        roughness: 0.8,
    });
    const ground = THREE.Mesh(ground_Geo, ground_material);
    ground.receiveShadow = true;
    ground.position.y = -2;
    scene.add(ground);
    physics.addMesh(ground);

    //Cube
    const cube_geo = new THREE.BoxGeometry();
    const cube_Material = new THREE.MeshStandardMaterial({
        color: 0xAA88FF,
    });
    const cube = new THREE.Mesh(cube_geo, cube_Material);
    cube.position.y = 3;
    scene.add(cube);
    cube.castShadow = true;
    physics.addMesh(cube, 1);
    
    //Input
    window.addEventListener('keydown', keydown => {
        if(keydown.key === 'a') {
            physics.setVelocity(cube, {x: -4, y: 0, z: 0});
        }
        if(keydown.key === 'd') {
            physics.setVelocity(cube, {x: 4, y: 0, z: 0});
        }
        if(keydown.key === 'w') {
            physics.setVelocity(cube, {x: 0, y: 0, z: 6});
        }
    })

    //Animation
    const animate = timestamp => {
        window.requestAnimationFrame(animate);

        // Render
        renderer.render(scene, camera);
    };
    window.requestAnimationFrame(animate);
});