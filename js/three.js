import * as THREE from "three";
if (
  "/" === window.location.pathname ||
  "/index.html" === window.location.pathname
) {
  const e = new THREE.WebGLRenderer({ antialias: !0 });
  e.setClearColor(855309),
    e.setSize(window.innerWidth, window.innerHeight),
    document.body.appendChild(e.domElement);
  const n = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10
  );
  n.position.z = 0;
  const i = new THREE.Scene(),
    t = new THREE.IcosahedronGeometry(1, 3),
    a = new THREE.MeshStandardMaterial({ color: 16777215, flatShading: !0 }),
    o = new THREE.Mesh(t, a);
  i.add(o);
  const r = new THREE.MeshBasicMaterial({ color: 8026746, wireframe: !0 }),
    d = new THREE.Mesh(t, r);
  d.scale.multiplyScalar(1.001), o.add(d);
  const w = new THREE.HemisphereLight(16777215, 0);
  function animate() {
    requestAnimationFrame(animate),
      (o.rotation.y += 5e-4),
      (o.rotation.x += -5e-4),
      e.render(i, n);
  }
  i.add(w),
    animate(),
    window.addEventListener("resize", () => {
      const i = window.innerWidth,
        t = window.innerHeight;
      e.setSize(i, t), (n.aspect = i / t), n.updateProjectionMatrix();
    });
}
