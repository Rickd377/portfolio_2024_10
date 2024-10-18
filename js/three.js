import * as THREE from "three";

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x0d0d0d); // Set the background color to $primary_color
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 0;

    const scene = new THREE.Scene();

    const geo = new THREE.IcosahedronGeometry(1.0, 3);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x7a7a7a,
        wireframe: true,
    });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.multiplyScalar(1.001);
    mesh.add(wireMesh);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
    scene.add(hemiLight);

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.0005;
        mesh.rotation.x += -0.0005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}