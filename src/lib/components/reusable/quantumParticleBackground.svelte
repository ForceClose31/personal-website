<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { themeStore, type ThemeMode } from '$lib/stores/theme';

  let containerEl: HTMLElement;
  let currentTheme: ThemeMode = 'dark';

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let streamParticles: THREE.Points;
  let cloudParticles: THREE.Points;
  let streamGeo: THREE.BufferGeometry;
  let cloudGeo: THREE.BufferGeometry;
  let streamMat: THREE.PointsMaterial;
  let cloudMat: THREE.PointsMaterial;
  let particleTexture: THREE.CanvasTexture;

  let animId: number;
  let clock: THREE.Clock;
  let targetRotationY = 0;
  let targetRotationX = 0;
  let targetCameraZ = 11;

  const unsubscribe = themeStore.subscribe((mode) => {
    currentTheme = mode;
    updateParticleColors();
  });

  function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }

  function updateParticleColors() {
    if (!streamGeo || !cloudGeo) return;
    const isLight = currentTheme === 'light';

    const col1 = isLight ? new THREE.Color('#0284c7') : new THREE.Color('#10b981');
    const col2 = isLight ? new THREE.Color('#059669') : new THREE.Color('#38bdf8');
    const col3 = isLight ? new THREE.Color('#334155') : new THREE.Color('#6366f1');

    const streamCol = streamGeo.attributes.color.array as Float32Array;
    for (let i = 0; i < streamCol.length / 3; i++) {
      const c = new THREE.Color();
      c.lerpColors(col1, col2, Math.random());
      streamCol[i * 3] = c.r;
      streamCol[i * 3 + 1] = c.g;
      streamCol[i * 3 + 2] = c.b;
    }
    streamGeo.attributes.color.needsUpdate = true;

    const cloudCol = cloudGeo.attributes.color.array as Float32Array;
    for (let j = 0; j < cloudCol.length / 3; j++) {
      const c = new THREE.Color();
      c.lerpColors(col2, col3, Math.random());
      cloudCol[j * 3] = c.r;
      cloudCol[j * 3 + 1] = c.g;
      cloudCol[j * 3 + 2] = c.b;
    }
    cloudGeo.attributes.color.needsUpdate = true;

    if (streamMat && cloudMat) {
      streamMat.opacity = isLight ? 0.35 : 0.65;
      cloudMat.opacity = isLight ? 0.25 : 0.45;
      streamMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      cloudMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
    }
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = maxScroll > 0 ? scrollY / maxScroll : 0;

    targetRotationY = scrollRatio * Math.PI * 2.5;
    targetRotationX = Math.sin(scrollRatio * Math.PI) * 0.2;
    targetCameraZ = 11 + Math.sin(scrollRatio * Math.PI) * 2;
  }

  function handleResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (streamParticles && cloudParticles && scene && camera) {
      // Continuous ambient floating drift
      streamParticles.rotation.y = elapsedTime * 0.08;
      cloudParticles.rotation.y = elapsedTime * 0.035;

      // Scroll response lerp
      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    }
  }

  onMount(() => {
    if (!containerEl) return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 11);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // Fully transparent background canvas!
    containerEl.appendChild(renderer.domElement);

    particleTexture = createGlowTexture();

    // 1. Central Core Particle Stream (600 Count)
    const streamCount = 600;
    streamGeo = new THREE.BufferGeometry();
    const streamPos = new Float32Array(streamCount * 3);
    const streamCol = new Float32Array(streamCount * 3);

    for (let i = 0; i < streamCount; i++) {
      const radius = 1.0 + Math.random() * 2.5;
      const angle = (i / streamCount) * Math.PI * 30;
      const y = (i / streamCount - 0.5) * 50;

      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.6;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.6;

      streamPos[i * 3] = x;
      streamPos[i * 3 + 1] = y;
      streamPos[i * 3 + 2] = z;
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamCol, 3));

    streamMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false
    });
    streamParticles = new THREE.Points(streamGeo, streamMat);
    scene.add(streamParticles);

    // 2. Volumetric Ambient Particle Cloud (900 Count)
    const cloudCount = 900;
    cloudGeo = new THREE.BufferGeometry();
    const cloudPos = new Float32Array(cloudCount * 3);
    const cloudCol = new Float32Array(cloudCount * 3);

    for (let j = 0; j < cloudCount; j++) {
      const r = Math.pow(Math.random(), 0.6) * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (j / cloudCount - 0.5) * 55;

      const x = Math.cos(theta) * r + (Math.random() - 0.5) * 0.9;
      const z = Math.sin(theta) * r + (Math.random() - 0.5) * 0.9;

      cloudPos[j * 3] = x;
      cloudPos[j * 3 + 1] = y;
      cloudPos[j * 3 + 2] = z;
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPos, 3));
    cloudGeo.setAttribute('color', new THREE.BufferAttribute(cloudCol, 3));

    cloudMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false
    });
    cloudParticles = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloudParticles);

    updateParticleColors();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    animate();
  });

  onDestroy(() => {
    unsubscribe();
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
    cancelAnimationFrame(animId);
    if (renderer) renderer.dispose();
  });
</script>

<div
  bind:this={containerEl}
  class="fixed inset-0 pointer-events-none z-0 overflow-hidden"
></div>

<div class="relative z-10 w-full">
  <slot />
</div>
