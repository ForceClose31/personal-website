<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Button from "$lib/components/reusable/button.svelte";  
  import Typewriter from '$lib/components/reusable/typer.svelte';
  import Heading from '$lib/components/reusable/heading.svelte';
  import { projectsStore, type Project } from '$lib/stores/projects';

  let projects: Project[] = [];
  let swiperInstance: any = null;

  const unsubscribe = projectsStore.subscribe((value) => {
    projects = value;
  });

  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
      swiperInstance = new Swiper('.mySwiper2', {
        grabCursor: true,
        effect: 'creative',
        creativeEffect: {
          prev: {
            shadow: true,
            translate: ['-120%', 0, -300],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -300],
          },
        },
        slidesPerView: 'auto',
        loop: false,
        centeredSlides: true,
        speed: 600,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }

  onMount(() => {
    initSwiper();
    return () => {
      unsubscribe();
      if (swiperInstance) swiperInstance.destroy();
    };
  });

  afterUpdate(() => {
    // Re-init swiper if project list changes length
    if (swiperInstance && swiperInstance.slides && swiperInstance.slides.length !== projects.length) {
      setTimeout(initSwiper, 100);
    }
  });
</script>

<section id="projects" class="py-16">
  <!-- Heading Component -->
  <Heading 
    heading="Featured Projects" 
    subheading="Showing off my latest Projects" 
    subicon="fas fa-briefcase" 
  />
  
  <Typewriter 
    Class="text-center font-medium text-lg mt-8 leading-relaxed max-w-2xl mx-auto"
    text="I have worked on many projects. Here are some of the projects I have completed. Swipe or use navigation buttons."
    typingSpeed={50}
    replay={false} 
  />

  <div class="swiper-container mySwiper2 mt-8">
    <div class="swiper-wrapper py-6">
      {#each projects as project (project.id)}
        <div class="swiper-slide flex justify-center items-center px-2">
          <div class="w-full max-w-[460px] md:max-w-[480px] bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:border-emerald-500/30 group">
            
            <!-- Header & Title -->
            <div class="flex justify-between items-start gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gradient group-hover:text-emerald-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <span class={`text-xs px-2.5 py-1 rounded-full font-medium border ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                {project.status}
              </span>
            </div>

            <!-- Image preview -->
            {#if project.image}
              <div class="relative w-full h-44 md:h-48 overflow-hidden rounded-xl bg-black/40 mb-4 border border-white/5">
                <img 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.image}
                  alt={project.title} 
                />
              </div>
            {:else}
              <div class="w-full h-36 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm mb-4">
                No Preview Image
              </div>
            {/if}

            <!-- Description -->
            <p class="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            <div class="h-[1px] w-full bg-white/10 my-3"></div>

            <!-- Tags / Solves -->
            <div class="flex flex-wrap items-center gap-1.5 mb-3">
              <span class="text-xs text-neutral-400 font-semibold mr-1">Tags:</span>
              {#each project.solves as solve}
                <span class="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-medium">
                  {solve}
                </span>
              {/each}
            </div>

            <!-- Tech Stack & Links -->
            <div class="flex justify-between items-center pt-2 border-t border-white/5">
              <!-- Tech Stack Icons -->
              <div class="flex items-center gap-1.5">
                <span class="text-xs text-neutral-400 font-semibold mr-1">Tech:</span>
                <div class="flex items-center gap-1.5">
                  {#each project.techStack as stack}
                    <img 
                      class="w-6 h-6 object-contain hover:scale-110 transition-transform"
                      src={`https://skillicons.dev/icons?i=${stack.icon}`}
                      alt={stack.name} 
                      title={stack.name}
                    />
                  {/each}
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex gap-2">
                {#if project.links.github}
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1 border border-white/10"
                  >
                    <i class="fab fa-github"></i> Repo
                  </a>
                {/if}
                {#if project.links.live}
                  <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-90 transition-all flex items-center gap-1"
                  >
                    <i class="fas fa-external-link-alt text-[10px]"></i> Live
                  </a>
                {/if}
              </div>
            </div>

          </div>
        </div>
      {/each}
    </div>
    
    <!-- Custom Swiper Navigation Controls -->
    <div class="swiper-button-next text-emerald-400"></div>
    <div class="swiper-button-prev text-emerald-400"></div>
  </div>

  <div class="flex flex-col justify-center items-center mt-10">
    <Typewriter 
      Class="text-center font-medium text-lg mb-4 leading-relaxed"
      text="Explore more of my work on GitHub. Click the button below to check it out."
      typingSpeed={50}
      replay={false} 
    />
    <Button
      text="Github"
      link="https://github.com/ForceCLose31"
    />
  </div>
</section>

<style>
  .mySwiper2 {
    width: 100%;
    overflow: hidden;
    padding-bottom: 2rem;
  }
  
  :global(.swiper-button-next),
  :global(.swiper-button-prev) {
    color: #27ea66 !important;
    transform: scale(0.7);
  }
</style>