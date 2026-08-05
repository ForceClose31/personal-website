<script lang="ts">
  import Home from '$lib/components/sections/home.svelte';
  import Stack from '$lib/components/sections/stack.svelte';
  import Project from '$lib/components/sections/projects.svelte';
  import CliTerminal from '$lib/components/sections/cliTerminal.svelte';
  import Contact from '$lib/components/sections/contact.svelte';
  import Overlay from '$lib/components/reusable/overlay.svelte';
  import QuantumParticleBackground from '$lib/components/reusable/quantumParticleBackground.svelte';
</script>

<!-- Hero Section (Clean Hero, No Spiral Particle Overlay) -->
<Home />

<!-- 3D Volumetric Parallax Background starting FROM Tech Stack down to before Footer -->
<QuantumParticleBackground>
  <Stack />
  <Project />
  <CliTerminal />
  <Contact />
</QuantumParticleBackground>

<Overlay />
