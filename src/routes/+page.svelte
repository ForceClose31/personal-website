<script lang="ts">
  import { onMount } from 'svelte';
  import Home from '$lib/components/sections/home.svelte';
  import Stack from '$lib/components/sections/stack.svelte';
  import Project from '$lib/components/sections/projects.svelte';
  import Overlay from '$lib/components/reusable/overlay.svelte';
  import Contact from '$lib/components/sections/contact.svelte';
  import Loader from "$lib/components/reusable/prelaoder.svelte";
  import ParallaxBackground from '$lib/components/reusable/parallaxBackground.svelte';

  let isLoading = true;

  onMount(() => {
    window.addEventListener('load', () => {
      isLoading = false;
    });
  });

  setTimeout(() => {
    isLoading = false;
  }, 3000);
</script>

{#if isLoading}
  <Loader />
{/if}

<!-- Page content -->
{#if !isLoading}
  <!-- Hero Section -->
  <Home />

  <!-- Parallax Sections (Tech Stack up to before Footer) -->
  <ParallaxBackground>
    <Stack />
    <Project />
    <Contact />
  </ParallaxBackground>

  <Overlay />
{/if}
