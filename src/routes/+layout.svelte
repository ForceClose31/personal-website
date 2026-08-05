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
    { name: "contact", path: "/#contact" },
    { name: "admin portal", path: "/admin" }
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
  <nav class="nav px-4 py-4 flex justify-between items-center">
    <a href="/" class="flex items-center justify-center gap-1">
      <img src={logo} class="w-8 h-8 object-contain" alt="logo">
      <h3 class="text-2xl mb-0.5 mr-2">Nur Bashori.</h3>
    </a>
    <div class="mr-4 flex items-center gap-3">
      <a href="/admin" class="hidden sm:inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
        <i class="fas fa-cog text-[10px] mr-1"></i> Admin
      </a>
      <div on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0">
        <i class="fa-solid fa-bars-staggered text-2xl cursor-pointer"></i>
      </div>
    </div>
  </nav>

  <!-- Navigation Overlay -->
  <div class="navigation fixed inset-0 flex justify-center items-center z-50 bg-black/90 backdrop-blur-md"
       class:hidden={!navState}>
    <div class="nav-body w-[450px] sm:w-[400px] md:w-[500px] xl:w-[550px] rounded-2xl p-4">
      <div class="nav-head px-4 py-4 flex justify-between items-center border-b border-white/10">
        <div class="flex items-center justify-center gap-2">
          <img src={logo} class="w-8 h-8 object-contain" alt="logo">
          <h3 class="text-2xl font-bold mb-0.5">Nur Bashori.</h3>
        </div>
        <i class="fas fa-x cursor-pointer text-xl text-neutral-400 hover:text-white" on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0"></i>
      </div>
      
      <div class="nav-items flex flex-col justify-center items-center mt-6">
        {#each navlinks as ash}
          <a 
            href={ash.path} 
            on:click={() => (navState = false)}
            class="flex justify-between items-center border-b border-white/10 px-6 py-4 text-xl w-full bg-white/5 hover:bg-white/10 rounded-xl mb-3 capitalize font-semibold transition-all group"
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

<footer data-aos="fade-down" class="bg-black text-gradient px-4 py-6 mb-4">
  <div class="container mx-auto text-center">
    <h3 class="text-2xl font-semibold mb-4">"Code is my art, each line a stroke that shapes innovation."</h3>
    <p class="text-sm mb-6 italic">- Nur Bashori</p>
    <p class="text-base">&copy; 2024 Nur Bashori</p>
  </div>
</footer>

<style>
  .navigation.hidden {
    display: none;
  }
</style>
