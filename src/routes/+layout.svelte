<script lang="ts">
  import { onMount } from 'svelte';
  import logo from "../assets/images/svg.svg";
  import Cusor from "$lib/components/reusable/cusor.svelte";    
  import Loader from "$lib/components/reusable/prelaoder.svelte";
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import "../app.css";
  import { themeStore, type ThemeMode } from '$lib/stores/theme';

  let navState = false;
  let isLoading = true;
  let currentTheme: ThemeMode = 'dark';

  const unsubscribe = themeStore.subscribe((mode) => {
    currentTheme = mode;
  });

  const navlinks = [
    { name: "about", path: "/#about" },
    { name: "projects", path: "/#projects" },
    { name: "terminal cli", path: "/#cli" },
    { name: "contact", path: "/#contact" }
  ];

  function toggleNav() {
    navState = !navState;
  }

  onMount(() => {
    themeStore.initTheme();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });

    const timer = setTimeout(() => {
      isLoading = false;
    }, 2000);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  });
</script>

{#if isLoading}
  <Loader />
{:else}
  <Cusor />
  <header class="px-4 py-4 fixed w-full z-50">
    <nav class="nav px-6 py-3.5 flex justify-between items-center max-w-6xl mx-auto rounded-full shadow-xl">
      <a href="/" class="flex items-center justify-center gap-2">
        <img src={logo} class="w-8 h-8 object-contain" alt="logo">
        <h3 class="text-xl font-extrabold tracking-tight mb-0.5 text-[var(--text-primary)]">Nur Bashori<span class="text-emerald-500">.</span></h3>
      </a>
      <div class="flex items-center gap-3">
        <!-- Theme Switcher Button -->
        <button
          type="button"
          on:click={themeStore.toggleTheme}
          aria-label="Toggle Theme"
          class="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-sm hover:scale-110 hover:border-emerald-500/40 transition-all bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
        >
          {#if currentTheme === 'dark'}
            <i class="fas fa-sun text-amber-400"></i>
          {:else}
            <i class="fas fa-moon text-indigo-600"></i>
          {/if}
        </button>

        <div on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0" class="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <i class="fa-solid fa-bars-staggered text-xl cursor-pointer"></i>
        </div>
      </div>
    </nav>

    <!-- Navigation Overlay -->
    <div class="navigation fixed inset-0 flex justify-center items-center z-50 bg-black/80 backdrop-blur-xl"
         class:hidden={!navState}>
      <div class="nav-body w-[450px] sm:w-[400px] md:w-[500px] xl:w-[550px] rounded-3xl p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl">
        <div class="nav-head px-2 py-3 flex justify-between items-center border-b border-[var(--border-color)]">
          <div class="flex items-center justify-center gap-2">
            <img src={logo} class="w-8 h-8 object-contain" alt="logo">
            <h3 class="text-2xl font-bold mb-0.5 text-[var(--text-primary)]">Nur Bashori<span class="text-emerald-500">.</span></h3>
          </div>
          <i class="fas fa-x cursor-pointer text-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] p-2" on:click={toggleNav} on:keydown={(e) => e.key === 'Enter' && toggleNav()} role="button" tabindex="0"></i>
        </div>
        
        <div class="nav-items flex flex-col justify-center items-center mt-6">
          {#each navlinks as ash}
            <a 
              href={ash.path} 
              on:click={() => (navState = false)}
              class="flex justify-between items-center border border-[var(--border-color)] px-6 py-4 text-xl w-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-emerald-500/30 rounded-2xl mb-3 capitalize font-semibold transition-all group"
            >
              <span class="group-hover:text-emerald-500 transition-colors text-[var(--text-primary)]">{ash.name}</span>
              <i class="fas fa-arrow-right text-sm text-[var(--text-muted)] group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"></i>
            </a>
          {/each}
        </div>
        
        <div class="nav-footer flex flex-col justify-center items-center mb-2 mt-6">
          <p class="text-xs text-[var(--text-muted)]">&copy; 2024 Nur Bashori. All rights reserved.</p>
        </div>
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer data-aos="fade-down" class="bg-[var(--bg-primary)] border-t border-[var(--border-color)] text-[var(--text-primary)] px-4 py-8 relative z-20">
    <div class="container mx-auto text-center">
      <h3 class="text-xl sm:text-2xl font-bold mb-3 text-[var(--text-primary)]">"Code is my art, each line a stroke that shapes innovation."</h3>
      <p class="text-xs sm:text-sm mb-4 italic text-[var(--text-secondary)]">- Nur Bashori</p>
      <p class="text-xs text-[var(--text-muted)]">&copy; 2024 Nur Bashori. All rights reserved.</p>
    </div>
  </footer>
{/if}

<style>
  .navigation.hidden {
    display: none;
  }
</style>
