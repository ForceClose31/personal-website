<script lang="ts">
  import { onMount } from 'svelte';

  let showFogOverlay = true;

  function checkScrollPosition() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= pageHeight - 10) {
      showFogOverlay = false;
    } else {
      showFogOverlay = true;
    }
  }

  onMount(() => {
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  });
</script>

{#if showFogOverlay}
  <div class="fog-overlay pointer-events-none"></div>
{/if}

<style>
  .fog-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25vh;
    background: linear-gradient(to top, var(--bg-primary), transparent);
    pointer-events: none;
    transition: opacity 0.3s ease, background 0.3s ease;
    z-index: 15;
  }
</style>
