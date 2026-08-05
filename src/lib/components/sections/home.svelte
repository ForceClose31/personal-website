<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Button from "$lib/components/reusable/button.svelte";
  import { themeStore, type ThemeMode } from '$lib/stores/theme';

  let vantaEffect: any = null;
  let currentTheme: ThemeMode = 'dark';

  const socials = [
    { name: "GitHub", Socialicon: "fab fa-github", link: "https://github.com/ForceClose31" },
    { name: "Email", Socialicon: "fa-solid fa-envelope", link: "mailto:forceclose31@gmail.com" },
    { name: "LinkedIn", Socialicon: "fab fa-linkedin", link: "https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/" }
  ];

  function initVanta(mode: ThemeMode) {
    if (vantaEffect) vantaEffect.destroy();

    if (typeof window !== 'undefined' && (window as any).VANTA && (window as any).VANTA.DOTS) {
      const isLight = mode === 'light';
      vantaEffect = (window as any).VANTA.DOTS({
        el: "#about",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isLight ? 0x059669 : 0x27ea66,
        color2: isLight ? 0xcbd5e1 : 0x363636,
        backgroundColor: isLight ? 0xf8fafc : 0x08090d,
        size: 6.0,
        spacing: 22.0,
        showLines: false
      });
    }
  }

  const unsubscribe = themeStore.subscribe((mode) => {
    currentTheme = mode;
    if (typeof window !== 'undefined') {
      initVanta(mode);
    }
  });

  onMount(() => {
    initVanta(currentTheme);
  });

  onDestroy(() => {
    unsubscribe();
    if (vantaEffect) vantaEffect.destroy();
  });
</script>

<section class="head pt-32 pb-24 relative overflow-hidden" id="about">
  <header class="flex justify-center items-center flex-col text-center max-w-4xl mx-auto px-4 relative z-10">
    <!-- Greeting Badge -->
    <div 
      data-aos="fade-down"
      class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm font-bold tracking-wide shadow-md mb-6 backdrop-blur-md"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
      Hi, I'm Nur Bashori Rahmat Oktavianto Herman
    </div>

    <!-- Main Title -->
    <h1 data-aos="fade-up" class="text-3xl sm:text-6xl leading-tight font-extrabold tracking-tight mt-2 capitalize text-gradient-cyber">
      I create scalable systems and innovative applications to empower businesses and enhance user experiences.
    </h1>

    <!-- Subtitle -->
    <p data-aos="fade-up" data-aos-delay="100" class="text-[var(--text-secondary)] font-medium text-base sm:text-xl mt-6 mb-8 leading-relaxed max-w-2xl">
      With expertise in backend, mobile, and fullstack development, I design robust, user-friendly solutions that tackle real-world challenges effectively.
    </p>

    <!-- Social Icons & CTA -->
    <div class="flex flex-col sm:flex-row items-center gap-6 mt-4" data-aos="fade-up" data-aos-delay="200">
      <div class="flex items-center gap-3">
        {#each socials as { name, Socialicon, link }}
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={name}
            class="w-12 h-12 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-emerald-500/40 text-[var(--text-primary)] hover:text-emerald-500 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <i class={Socialicon}></i>
          </a>
        {/each}
      </div>

      <Button text="Let's Talk" link="https://wa.me/6281393418944" />
    </div>
  </header>
</section>
