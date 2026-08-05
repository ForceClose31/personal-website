<script lang="ts">
  import { onMount } from 'svelte';
  import Home from '$lib/components/sections/home.svelte';
  import Stack from '$lib/components/sections/stack.svelte';
  import Project from '$lib/components/sections/projects.svelte';
  import CliTerminal from '$lib/components/sections/cliTerminal.svelte';
  import Contact from '$lib/components/sections/contact.svelte';
  import Overlay from '$lib/components/reusable/overlay.svelte';
  import Loader from "$lib/components/reusable/prelaoder.svelte";
  import QuantumParticleBackground from '$lib/components/reusable/quantumParticleBackground.svelte';

  let isLoading = true;

  onMount(() => {
    window.addEventListener('load', () => {
      isLoading = false;
    });
  });

  setTimeout(() => {
    isLoading = false;
  }, 2500);
</script>

{#if isLoading}
  <Loader />
{/if}

<!-- Page content with 3D Volumetric Parallax Background -->
{#if !isLoading}
  <QuantumParticleBackground>
    <Home />
    <Stack />
    <Project />
    <CliTerminal />
    <Contact />
    <Overlay />
  </QuantumParticleBackground>
{/if}
