<script lang="ts">
  import { onMount } from 'svelte';
  import logo from "../assets/images/svg.svg";
  import Button from "$lib/components/reusable/button.svelte";    
  import Cusor from "$lib/components/reusable/cusor.svelte";    
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import "../app.css";

  let navState = false;

  const navlinks = [
    { name: "about", path: "/#about" },
    { name: "projects", path: "/#projects" },
    { name: "contact", path: "/#contact" }
  ];

  function toggleNav() {
    navState = !navState;
  }

  onMount(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  });
</script>

<Cusor />
<header class="px-4 py-4 fixed w-full z-50">
  <nav class="nav px-6 py-4 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-2xl">
    <a href="/" class="flex items-center justify-center gap-2">
      <img src={logo} class="w-8 h-8 object-contain" alt="logo">
      <h3 class="text-xl font-extrabold tracking-tight mb-0.5 text-white">Nur Bashori<span class="text-emerald-400">.</span></h3>
    </a>
    <div class="flex items-center gap-3">
      <div on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0" class="p-2 text-neutral-300 hover:text-white transition-colors">
        <i class="fa-solid fa-bars-staggered text-xl cursor-pointer"></i>
      </div>
    </div>
  </nav>

  <!-- Navigation Overlay -->
  <div class="navigation fixed inset-0 flex justify-center items-center z-50 bg-black/90 backdrop-blur-xl"
       class:hidden={!navState}>
    <div class="nav-body w-[450px] sm:w-[400px] md:w-[500px] xl:w-[550px] rounded-3xl p-6 bg-neutral-950/90 border border-white/10 shadow-2xl">
      <div class="nav-head px-2 py-3 flex justify-between items-center border-b border-white/10">
        <div class="flex items-center justify-center gap-2">
          <img src={logo} class="w-8 h-8 object-contain" alt="logo">
          <h3 class="text-2xl font-bold mb-0.5">Nur Bashori<span class="text-emerald-400">.</span></h3>
        </div>
        <i class="fas fa-x cursor-pointer text-lg text-neutral-400 hover:text-white p-2" on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0"></i>
      </div>
      
      <div class="nav-items flex flex-col justify-center items-center mt-6">
        {#each navlinks as ash}
          <a 
            href={ash.path} 
            on:click={() => (navState = false)}
            class="flex justify-between items-center border border-white/5 px-6 py-4 text-xl w-full bg-white/[0.03] hover:bg-white/[0.08] hover:border-emerald-500/30 rounded-2xl mb-3 capitalize font-semibold transition-all group"
          >
            <span class="group-hover:text-emerald-400 transition-colors">{ash.name}</span>
            <i class="fas fa-arrow-right text-sm text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"></i>
          </a>
        {/each}
      </div>
      
      <div class="nav-footer flex flex-col justify-center items-center mb-2 mt-6">
        <p class="text-xs text-neutral-500">&copy; 2024 Nur Bashori. All rights reserved.</p>
      </div>
    </div>
  </div>
</header>

<main>
  <slot />
</main>

<footer data-aos="fade-down" class="bg-black/90 border-t border-white/10 text-gradient px-4 py-8 mb-4">
  <div class="container mx-auto text-center">
    <h3 class="text-xl sm:text-2xl font-semibold mb-3">"Code is my art, each line a stroke that shapes innovation."</h3>
    <p class="text-xs sm:text-sm mb-4 italic text-neutral-400">- Nur Bashori</p>
    <p class="text-xs text-neutral-500">&copy; 2024 Nur Bashori. All rights reserved.</p>
  </div>
</footer>

<style>
  .navigation.hidden {
    display: none;
  }
</style>
