<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Button from "$lib/components/reusable/button.svelte";  
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
            translate: ['-120%', 0, -250],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -250],
          },
        },
        slidesPerView: 'auto',
        loop: false,
        centeredSlides: true,
        speed: 600,
        navigation: {
          nextEl: '.project-next-btn',
          prevEl: '.project-prev-btn',
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
    if (swiperInstance && swiperInstance.slides && swiperInstance.slides.length !== projects.length) {
      setTimeout(initSwiper, 100);
    }
  });
</script>

<section id="projects" class="py-20">
  <!-- Heading Component -->
  <Heading 
    heading="Featured Projects" 
    subheading="Showing off my latest Projects" 
    subicon="fas fa-briefcase" 
  />
  
  <p class="text-center font-medium text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto text-[var(--text-secondary)] px-4">
    I have worked on many projects. Here are some of the projects I have completed. Swipe left or right or use navigation buttons.
  </p>

  <!-- Swiper Relative Wrapper keeping navigation controls close to the cards -->
  <div class="relative max-w-3xl mx-auto mt-8 px-2 sm:px-12">
    <!-- Compact Custom Navigation Arrows tight to the project card container -->
    <button 
      class="project-prev-btn absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-emerald-500 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:scale-110 transition-all shadow-xl disabled:opacity-30 disabled:pointer-events-none"
      aria-label="Previous Project"
    >
      <i class="fas fa-chevron-left text-sm"></i>
    </button>

    <button 
      class="project-next-btn absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-emerald-500 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:scale-110 transition-all shadow-xl disabled:opacity-30 disabled:pointer-events-none"
      aria-label="Next Project"
    >
      <i class="fas fa-chevron-right text-sm"></i>
    </button>

    <div class="swiper-container mySwiper2 overflow-hidden">
      <div class="swiper-wrapper py-6">
        {#each projects as project (project.id)}
          <div class="swiper-slide flex justify-center items-center px-1">
            <div class="w-full max-w-[440px] md:max-w-[460px] bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-5 shadow-2xl transition-all duration-300 hover:border-emerald-500/40 group hover:shadow-emerald-500/10">
              
              <!-- Title & Status -->
              <div class="flex justify-between items-start gap-2 mb-3">
                <h3 class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <span class={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
                  {project.status}
                </span>
              </div>

              <!-- Image Preview -->
              {#if project.image}
                <div class="relative w-full h-44 md:h-48 overflow-hidden rounded-2xl bg-black/10 mb-4 border border-[var(--border-color)] group-hover:border-emerald-500/20 transition-all">
                  <img 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={project.image}
                    alt={project.title} 
                  />
                </div>
              {:else}
                <div class="w-full h-36 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] text-xs mb-4 border border-[var(--border-color)]">
                  No Image Available
                </div>
              {/if}

              <!-- Description -->
              <p class="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div class="h-[1px] w-full bg-[var(--border-color)] my-3"></div>

              <!-- Solves / Tags -->
              <div class="flex flex-wrap items-center gap-1.5 mb-4">
                <span class="text-[11px] text-[var(--text-muted)] font-semibold mr-1">Tags:</span>
                {#each project.solves as solve}
                  <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium">
                    {solve}
                  </span>
                {/each}
              </div>

              <!-- Tech Stack & Links -->
              <div class="flex justify-between items-center pt-3 border-t border-[var(--border-color)]">
                <!-- Tech Stack Icons -->
                <div class="flex items-center gap-1.5">
                  <span class="text-[11px] text-[var(--text-muted)] font-semibold mr-1">Tech:</span>
                  <div class="flex items-center gap-1.5">
                    {#each project.techStack as stack}
                      <img 
                        class="w-5 h-5 object-contain hover:scale-125 transition-transform"
                        src={`https://skillicons.dev/icons?i=${stack.icon}`}
                        alt={stack.name} 
                        title={stack.name}
                      />
                    {/each}
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2">
                  {#if project.links.github}
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--bg-secondary)] hover:bg-emerald-500/20 text-[var(--text-primary)] transition-all flex items-center gap-1.5 border border-[var(--border-color)]"
                    >
                      <i class="fab fa-github"></i> Repo
                    </a>
                  {/if}
                  {#if project.links.live}
                    <a 
                      href={project.links.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
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
    </div>
  </div>

  <div class="flex flex-col justify-center items-center mt-10">
    <p class="text-center font-medium text-base mb-4 leading-relaxed text-[var(--text-secondary)]">
      Explore more of my work on GitHub. Click the button below to check it out.
    </p>
    <Button
      text="Github"
      link="https://github.com/ForceCLose31"
    />
  </div>
</section>

<style>
  .mySwiper2 {
    width: 100%;
    padding-bottom: 1.5rem;
  }
</style>