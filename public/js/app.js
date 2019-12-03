//#region App initialization ________________
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    // console.log('resizing')
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

//#endregion App Initialization ____________


//#region Camera & Controls __________________
let controls = new THREE.PointerLockControls(camera, document.body);
document.body.onclick = () => document.body.requestPointerLock();

scene.add(controls.getObject())


let isMovingForward = false,
    isMovingBackward = false,
    isMovingLeft = false,
    isRotatingRight = false;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 38 || event.keyCode === 87) isMovingForward = true;
    if (event.keyCode === 40 || event.keyCode === 83) isMovingBackward = true;
    if (event.keyCode === 37 || event.keyCode === 65) isMovingLeft = true;
    if (event.keyCode === 39 || event.keyCode === 68) isRotatingRight = true;
});
document.addEventListener('keyup', (event) => {
    if (event.keyCode === 38 || event.keyCode === 87) isMovingForward = false;
    if (event.keyCode === 40 || event.keyCode === 83) isMovingBackward = false;
    if (event.keyCode === 37 || event.keyCode === 65) isMovingLeft = false;
    if (event.keyCode === 39 || event.keyCode === 68) isRotatingRight = false;
});

function animatePlayer() {
    if (!player) return;

    if (isMovingForward) {
        // let playerDirection = new THREE.Vector3();
        // player.getWorldDirection(playerDirection);
        // player.position.add(playerDirection.multiplyScalar(-1))
        camera.translateZ(-1)
    }
    // if (isMovingForward) player.translateZ(-1);
    // if (isMovingForward) player.position.z -= 1;
    if (isMovingBackward) player.translateZ(1);
    // if (isMovingBackward) player.position.z += .5;

    if (isMovingLeft) player.translateX(-0.1);
    if (isRotatingRight) player.translateX(0.1);
}
//#endregion Camera & Controls __________________

//#region Player & Other Scene Objects __________
let player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x333333
    })
);
// camera.position.z = 2;
camera.position.y = 1.5;
// player.add(camera);
controls.saveState
camera.add(player)
player.position.y = -.75;
player.position.z = -5;


// scene.add(player);


let floor_piece_0 = new THREE.Mesh(
    new THREE.BoxGeometry(10, .5, 550),
    new THREE.MeshBasicMaterial({
        color: 0xcccccc
    })
);
floor_piece_0.position.z = -225;
let floor_piece_1 = new THREE.Mesh(
    new THREE.BoxGeometry(500, 0.5, 5),
    new THREE.MeshBasicMaterial({
        color: 0xcccccc
    })
);
floor_piece_1.position.z = -500;
let floor = new THREE.Group();
floor.add(floor_piece_0);
floor.add(floor_piece_1);

scene.add(floor);
//#endregion Player & Other Scene Objects __________

//#region Animate Function_____________________
function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    animatePlayer();
    renderer.render(scene, camera);
}
animate();
//#endregion Animate Function_____________________