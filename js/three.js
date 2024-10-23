document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        initThreeJS();
    }
});

function initThreeJS() {
    import("three").then(THREE => {
        const renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
        camera.position.z = 0;

        const scene = new THREE.Scene();
        const geometry = new THREE.IcosahedronGeometry(1, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x7a7a7a, wireframe: true });
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
        wireframe.scale.multiplyScalar(1.001);
        mesh.add(wireframe);

        const light = new THREE.HemisphereLight(0xffffff, 0);
        scene.add(light);

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.y += 0.0005;
            mesh.rotation.x -= 0.0005;
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener("resize", () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    });
}