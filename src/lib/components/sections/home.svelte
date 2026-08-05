<script lang="ts">
  import Button from "$lib/components/reusable/button.svelte";

  const socials = [
    { name: "GitHub", Socialicon: "fab fa-github", link: "https://github.com/ForceClose31" },
    { name: "Email", Socialicon: "fa-solid fa-envelope", link: "mailto:forceclose31@gmail.com" },
    { name: "LinkedIn", Socialicon: "fab fa-linkedin", link: "https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/" }
  ];
</script>

<section class="head pt-32 pb-20" id="about">
  <header class="flex justify-center items-center flex-col text-center max-w-4xl mx-auto px-4">
    <!-- Greeting Badge -->
    <div 
      data-aos="fade-down"
      class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold tracking-wide shadow-lg shadow-emerald-500/5 mb-6 backdrop-blur-md"
    >
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      Hi, I'm Nur Bashori Rahmat Oktavianto Herman
    </div>

    <!-- Main Title -->
    <h1 data-aos="fade-up" class="text-gradient-cyber text-4xl sm:text-6xl leading-tight font-extrabold tracking-tight mt-2 capitalize">
      I create scalable systems and innovative applications to empower businesses and enhance user experiences.
    </h1>

    <!-- Subtitle -->
    <p data-aos="fade-up" data-aos-delay="100" class="text-neutral-300 font-medium text-base sm:text-xl mt-6 mb-8 leading-relaxed max-w-2xl">
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
            class="w-12 h-12 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
          >
            <i class={Socialicon}></i>
          </a>
        {/each}
      </div>

      <Button text="Let's Talk" link="https://wa.me/6281393418944" />
    </div>
  </header>
</section>
