import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const palette = {
  x: 0xd14b3f, y: 0x2b9a66, z: 0x3769d6,
  blue: 0x2f6fed, teal: 0x168a7a, orange: 0xb85d05,
  purple: 0x7a4ac8, green: 0x157347, gray: 0x8390a3
};

window.addEventListener('DOMContentLoaded', () => {
  const vectorStage = document.getElementById('vector3dStage');
  const crossStage = document.getElementById('cross3dStage');
  const volumeStage = document.getElementById('volume3dStage');
  if (vectorStage) initVectorScene(vectorStage);
  if (crossStage) initCrossScene(crossStage);
  if (volumeStage) initVolumeScene(volumeStage);
});

function baseScene(container, cameraPosition = [11, 9, 12]) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f7fc);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(...cameraPosition);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0);
  controls.update();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8390a3, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(8, 12, 10);
  scene.add(key);

  addCoordinatePlanes(scene, 18);
  const axes = new THREE.AxesHelper(8.5);
  scene.add(axes);

  const labels = createAxisLabels();
  scene.add(labels);

  function resize() {
    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 390);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(container);

  let active = true;
  const observer = new IntersectionObserver(entries => { active = entries[0]?.isIntersecting ?? true; });
  observer.observe(container);

  function loop() {
    requestAnimationFrame(loop);
    if (!active) return;
    controls.update();
    renderer.render(scene, camera);
  }
  loop();

  function resetCamera() {
    camera.position.set(...cameraPosition);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  return { scene, camera, renderer, controls, resetCamera };
}

function addCoordinatePlanes(scene, size) {
  const divisions = size;
  const gridXZ = new THREE.GridHelper(size, divisions, 0x9babc0, 0xd6deea);
  gridXZ.material.transparent = true;
  gridXZ.material.opacity = 0.45;
  scene.add(gridXZ);

  const gridXY = new THREE.GridHelper(size, divisions, 0xaab6c7, 0xe0e6ef);
  gridXY.rotation.x = Math.PI / 2;
  gridXY.material.transparent = true;
  gridXY.material.opacity = 0.18;
  scene.add(gridXY);

  const gridYZ = new THREE.GridHelper(size, divisions, 0xaab6c7, 0xe0e6ef);
  gridYZ.rotation.z = Math.PI / 2;
  gridYZ.material.transparent = true;
  gridYZ.material.opacity = 0.18;
  scene.add(gridYZ);
}

function createAxisLabels() {
  const group = new THREE.Group();
  group.add(spriteLabel('x', [8.8, 0, 0], '#c43129'));
  group.add(spriteLabel('y', [0, 8.8, 0], '#168a5d'));
  group.add(spriteLabel('z', [0, 0, 8.8], '#275ac5'));
  return group;
}

function spriteLabel(text, position, color = '#173d7a') {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = 'bold 76px system-ui';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(...position);
  sprite.scale.set(0.8, 0.8, 0.8);
  return sprite;
}

function arrowFrom(originArray, vectorArray, color, label = '', minLength = 0.001) {
  const origin = new THREE.Vector3(...originArray);
  const vector = new THREE.Vector3(...vectorArray);
  const length = vector.length();
  const direction = length > minLength ? vector.clone().normalize() : new THREE.Vector3(1, 0, 0);
  const headLength = Math.min(0.30, Math.max(0.12, length * 0.10));
  const headWidth = Math.min(0.16, Math.max(0.07, length * 0.05));
  const arrow = new THREE.ArrowHelper(direction, origin, Math.max(length, minLength), color, headLength, headWidth);
  const group = new THREE.Group();
  group.add(arrow);
  if (label && length > minLength) {
    const pos = origin.clone().add(vector.clone().multiplyScalar(1.06));
    group.add(spriteLabel(label, [pos.x, pos.y, pos.z], `#${new THREE.Color(color).getHexString()}`));
  }
  return group;
}

function dashedLine(points, color = palette.gray, opacity = 0.75) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));
  const material = new THREE.LineDashedMaterial({ color, dashSize: 0.24, gapSize: 0.15, transparent: true, opacity });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  return line;
}

function initVectorScene(container) {
  const base = baseScene(container, [12, 10, 13]);
  const dynamic = new THREE.Group();
  base.scene.add(dynamic);

  function update({ vector = [-6, 3, 4], showProjections = true } = {}) {
    clearGroup(dynamic);
    dynamic.add(arrowFrom([0, 0, 0], vector, palette.blue, 'v'));

    if (showProjections) {
      const [x, y, z] = vector;
      const xy = [x, y, 0];
      const xz = [x, 0, z];
      const yz = [0, y, z];
      dynamic.add(arrowFrom([0, 0, 0], xy, palette.teal, 'vxy'));
      dynamic.add(dashedLine([[x, y, z], xy], palette.teal));
      dynamic.add(dashedLine([[x, y, z], xz], palette.orange, 0.55));
      dynamic.add(dashedLine([[x, y, z], yz], palette.purple, 0.55));
      dynamic.add(dashedLine([[0, 0, 0], [x, 0, 0], [x, y, 0], [x, y, z]], palette.gray, 0.8));
    }
  }
  window.addEventListener('vector3d:update', e => update(e.detail));
  window.addEventListener('vector3d:reset', base.resetCamera);
  update();
}

function initCrossScene(container) {
  const base = baseScene(container, [11, 9, 13]);
  const dynamic = new THREE.Group();
  base.scene.add(dynamic);

  function update({ u = [1, 0, 2], v = [2, -1, 1], cross = [2, 3, -1] } = {}) {
    clearGroup(dynamic);
    dynamic.add(arrowFrom([0, 0, 0], u, palette.blue, 'u'));
    dynamic.add(arrowFrom([0, 0, 0], v, palette.teal, 'v'));
    dynamic.add(arrowFrom([0, 0, 0], cross, palette.orange, 'u×v'));

    const p0 = new THREE.Vector3(0, 0, 0);
    const p1 = new THREE.Vector3(...u);
    const p2 = new THREE.Vector3(u[0] + v[0], u[1] + v[1], u[2] + v[2]);
    const p3 = new THREE.Vector3(...v);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute([
      ...p0.toArray(), ...p1.toArray(), ...p2.toArray(),
      ...p0.toArray(), ...p2.toArray(), ...p3.toArray()
    ], 3));
    geom.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color: palette.purple, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
    dynamic.add(new THREE.Mesh(geom, material));
    dynamic.add(dashedLine([p1.toArray(), p2.toArray(), p3.toArray()], palette.gray, 0.8));
  }

  window.addEventListener('cross3d:update', e => update(e.detail));
  window.addEventListener('cross3d:reset', base.resetCamera);
  update();
}

function initVolumeScene(container) {
  const base = baseScene(container, [11, 10, 13]);
  const dynamic = new THREE.Group();
  base.scene.add(dynamic);
  const u = [1, 2, 3], v = [2, 0, 1], w = [1, 3, 0];
  const normal = cross(v, w);
  const normalSq = dot(normal, normal);
  const triple = dot(u, normal);
  const height = normal.map(x => triple * x / normalSq);

  function update({ showHeight = true } = {}) {
    clearGroup(dynamic);
    dynamic.add(arrowFrom([0, 0, 0], u, palette.blue, 'u'));
    dynamic.add(arrowFrom([0, 0, 0], v, palette.teal, 'v'));
    dynamic.add(arrowFrom([0, 0, 0], w, palette.purple, 'w'));
    if (showHeight) dynamic.add(arrowFrom([0, 0, 0], height, palette.orange, 'h'));

    const vertices = [
      [0,0,0], v, w, add(v,w), u, add(u,v), add(u,w), add(add(u,v),w)
    ];
    const edges = [[0,1],[0,2],[1,3],[2,3],[4,5],[4,6],[5,7],[6,7],[0,4],[1,5],[2,6],[3,7]];
    edges.forEach(([a,b]) => dynamic.add(dashedLine([vertices[a], vertices[b]], palette.gray, 0.85)));

    const geometry = new THREE.BufferGeometry();
    const faces = [
      0,1,3, 0,3,2,
      4,6,7, 4,7,5,
      0,4,5, 0,5,1,
      2,3,7, 2,7,6,
      0,2,6, 0,6,4,
      1,5,7, 1,7,3
    ];
    const positions = [];
    faces.forEach(i => positions.push(...vertices[i]));
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color: palette.blue, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false });
    dynamic.add(new THREE.Mesh(geometry, material));
  }
  window.addEventListener('volume3d:update', e => update(e.detail));
  window.addEventListener('volume3d:reset', base.resetCamera);
  update();
}

function clearGroup(group) {
  while (group.children.length) {
    const child = group.children.pop();
    child.traverse?.(obj => {
      obj.geometry?.dispose?.();
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.());
      else obj.material?.dispose?.();
    });
  }
}

function cross(a, b) {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
}
function dot(a, b) { return a.reduce((s, x, i) => s + x*b[i], 0); }
function add(a, b) { return a.map((x, i) => x + b[i]); }
