<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY = 0;
  let time = 0;
  let animId: number;
  let containerEl: HTMLElement;
  let elementTop = 0;

  function animateLoop() {
    time += 0.02;
    animId = requestAnimationFrame(animateLoop);
  }

  function handleScroll() {
    if (!containerEl) return;
    scrollY = window.scrollY;
  }

  onMount(() => {
    animId = requestAnimationFrame(animateLoop);
    if (containerEl) {
      const rect = containerEl.getBoundingClientRect();
      elementTop = rect.top + window.scrollY;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: relativeScroll = Math.max(0, scrollY - elementTop + 300);

  // Continuous animation calculations combined with scroll offset
  $: orb1Y = relativeScroll * -0.15 + Math.sin(time * 0.8) * 30;
  $: orb1X = Math.cos(time * 0.6) * 25;

  $: orb2Y = relativeScroll * 0.12 + Math.cos(time * 0.7) * 35;
  $: orb2X = Math.sin(time * 0.5) * -20;

  $: orb3Y = relativeScroll * -0.2 + Math.sin(time * 0.9 + 1) * 28;

  $: sym1Y = relativeScroll * -0.18 + Math.sin(time * 1.2) * 18;
  $: sym1X = relativeScroll * 0.05 + Math.cos(time * 0.9) * 15;
  $: sym1Rot = relativeScroll * 0.02 + Math.sin(time * 0.6) * 12;

  $: sym2Y = relativeScroll * -0.28 + Math.cos(time * 1.1) * 22;
  $: sym2X = relativeScroll * -0.08 + Math.sin(time * 0.8) * 18;
  $: sym2Rot = relativeScroll * -0.03 + Math.cos(time * 0.7) * -15;

  $: sym3Y = relativeScroll * -0.14 + Math.sin(time * 1.4 + 2) * 15;

  $: sym4Y = relativeScroll * -0.3 + Math.cos(time * 1.3) * 25;
  $: sym4Rot = relativeScroll * 0.04 + Math.sin(time * 0.8) * 18;
</script>

<div bind:this={containerEl} class="parallax-wrapper relative overflow-hidden w-full">
  <!-- Parallax Background Layer 1: Ambient Continuous Floating Glowing Gradient Orbs -->
  <div
    class="parallax-orb orb-1 pointer-events-none absolute"
    style="transform: translate3d({orb1X}px, {orb1Y}px, 0);"
  ></div>
  <div
    class="parallax-orb orb-2 pointer-events-none absolute"
    style="transform: translate3d({orb2X}px, {orb2Y}px, 0);"
  ></div>
  <div
    class="parallax-orb orb-3 pointer-events-none absolute"
    style="transform: translate3d(0, {orb3Y}px, 0);"
  ></div>

  <!-- Parallax Background Layer 2: Floating Tech Symbols with continuous movement & scroll response -->
  <div
    class="parallax-floating-symbol sym-1 pointer-events-none absolute text-emerald-500/25 font-mono text-5xl font-extrabold select-none"
    style="transform: translate3d({sym1X}px, {sym1Y}px, 0) rotate({sym1Rot}deg);"
  >
    &lt;/&gt;
  </div>

  <div
    class="parallax-floating-symbol sym-2 pointer-events-none absolute text-cyan-500/25 font-mono text-6xl font-extrabold select-none"
    style="transform: translate3d({sym2X}px, {sym2Y}px, 0) rotate({sym2Rot}deg);"
  >
    &#123; &#125;
  </div>

  <div
    class="parallax-floating-symbol sym-3 pointer-events-none absolute text-purple-500/25 font-mono text-4xl font-extrabold select-none"
    style="transform: translate3d(0, {sym3Y}px, 0);"
  >
    01010
  </div>

  <div
    class="parallax-floating-symbol sym-4 pointer-events-none absolute text-teal-500/25 font-mono text-5xl font-extrabold select-none"
    style="transform: translate3d(0, {sym4Y}px, 0) rotate({sym4Rot}deg);"
  >
    =&gt;
  </div>

  <!-- Grid overlay with subtle scroll depth shift -->
  <div
    class="parallax-grid pointer-events-none absolute inset-0 opacity-15"
    style="transform: translate3d(0, {relativeScroll * -0.05}px, 0);"
  ></div>

  <!-- Main Content Slot -->
  <div class="relative z-10">
    <slot />
  </div>
</div>

<style>
  .parallax-wrapper {
    background: radial-gradient(circle at 50% 0%, #060913 0%, #000000 75%);
  }

  .parallax-orb {
    border-radius: 50%;
    filter: blur(90px);
    will-change: transform;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: rgba(0, 113, 226, 0.2);
    top: 8%;
    left: -5%;
  }

  .orb-2 {
    width: 480px;
    height: 480px;
    background: rgba(39, 234, 102, 0.15);
    top: 42%;
    right: -8%;
  }

  .orb-3 {
    width: 420px;
    height: 420px;
    background: rgba(147, 51, 234, 0.18);
    top: 78%;
    left: 15%;
  }

  .sym-1 {
    top: 12%;
    left: 8%;
  }

  .sym-2 {
    top: 38%;
    right: 10%;
  }

  .sym-3 {
    top: 62%;
    left: 10%;
  }

  .sym-4 {
    top: 82%;
    right: 12%;
  }

  .parallax-grid {
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  }
</style>
