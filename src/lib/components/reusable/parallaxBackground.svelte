<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY = 0;
  let containerEl: HTMLElement;
  let elementTop = 0;

  function handleScroll() {
    if (!containerEl) return;
    scrollY = window.scrollY;
  }

  onMount(() => {
    if (containerEl) {
      const rect = containerEl.getBoundingClientRect();
      elementTop = rect.top + window.scrollY;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: relativeScroll = Math.max(0, scrollY - elementTop + 300);
</script>

<div bind:this={containerEl} class="parallax-wrapper relative overflow-hidden w-full">
  <!-- Parallax Background Layer 1: Ambient Glowing Gradient Orbs -->
  <div
    class="parallax-orb orb-1 pointer-events-none absolute"
    style="transform: translate3d(0, {relativeScroll * -0.15}px, 0);"
  ></div>
  <div
    class="parallax-orb orb-2 pointer-events-none absolute"
    style="transform: translate3d(0, {relativeScroll * 0.1}px, 0);"
  ></div>
  <div
    class="parallax-orb orb-3 pointer-events-none absolute"
    style="transform: translate3d(0, {relativeScroll * -0.22}px, 0);"
  ></div>

  <!-- Parallax Background Layer 2: Floating Tech Elements & Particles -->
  <div
    class="parallax-floating-symbol sym-1 pointer-events-none absolute text-emerald-500/20 font-mono text-5xl font-bold select-none"
    style="transform: translate3d({relativeScroll * 0.05}px, {relativeScroll * -0.18}px, 0) rotate({relativeScroll * 0.02}deg);"
  >
    &lt;/&gt;
  </div>

  <div
    class="parallax-floating-symbol sym-2 pointer-events-none absolute text-blue-500/20 font-mono text-6xl font-bold select-none"
    style="transform: translate3d({relativeScroll * -0.08}px, {relativeScroll * -0.28}px, 0) rotate({relativeScroll * -0.03}deg);"
  >
    &#123; &#125;
  </div>

  <div
    class="parallax-floating-symbol sym-3 pointer-events-none absolute text-purple-500/20 font-mono text-4xl font-bold select-none"
    style="transform: translate3d({relativeScroll * 0.04}px, {relativeScroll * -0.12}px, 0);"
  >
    01010
  </div>

  <div
    class="parallax-floating-symbol sym-4 pointer-events-none absolute text-cyan-500/20 font-mono text-5xl font-bold select-none"
    style="transform: translate3d({relativeScroll * -0.06}px, {relativeScroll * -0.32}px, 0) rotate({relativeScroll * 0.04}deg);"
  >
    =&gt;
  </div>

  <!-- Grid overlay with subtle parallax shift -->
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
    background: radial-gradient(circle at 50% 0%, #0a0e1a 0%, #000000 70%);
  }

  .parallax-orb {
    border-radius: 50%;
    filter: blur(80px);
    will-change: transform;
  }

  .orb-1 {
    width: 350px;
    height: 350px;
    background: rgba(0, 113, 226, 0.18);
    top: 10%;
    left: -5%;
  }

  .orb-2 {
    width: 450px;
    height: 450px;
    background: rgba(39, 234, 102, 0.12);
    top: 45%;
    right: -8%;
  }

  .orb-3 {
    width: 400px;
    height: 400px;
    background: rgba(147, 51, 234, 0.15);
    top: 80%;
    left: 20%;
  }

  .sym-1 {
    top: 15%;
    left: 8%;
  }

  .sym-2 {
    top: 40%;
    right: 10%;
  }

  .sym-3 {
    top: 65%;
    left: 12%;
  }

  .sym-4 {
    top: 85%;
    right: 15%;
  }

  .parallax-grid {
    background-size: 50px 50px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
</style>
