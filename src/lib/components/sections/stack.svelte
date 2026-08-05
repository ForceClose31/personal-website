<script lang="ts">
  import Heading from '$lib/components/reusable/heading.svelte';
  import Typewriter from '$lib/components/reusable/typer.svelte';
  import { onMount } from 'svelte';

  interface TechStack {
    name: string;
    icon: string;
  }

  const techStackRight: TechStack[] = [
    { name: 'Git', icon: 'git' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHP', icon: 'php' },
    { name: 'Python', icon: 'py' },
    { name: 'Svelte', icon: 'svelte' },
    { name: 'Express.js', icon: 'express' },
    { name: 'TypeScript', icon: 'ts' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Sass', icon: 'sass' },
    { name: 'React', icon: 'react' },
    { name: 'Bootstrap', icon: 'bootstrap' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Dart', icon: 'dart' },
    { name: 'Kotlin', icon: 'kotlin' },
    { name: 'Java', icon: 'java' },
    { name: 'C#', icon: 'c#' },
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'Javascript', icon: 'javascript' },
    { name: 'Solidity', icon: 'solidity' }
  ];

  onMount(() => {
    if (typeof Swiper !== 'undefined') {
      new Swiper('.swiper-right', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: true
        },
        speed: 3500
      });
    }
  });
</script>

<section class="stack py-16">
  <Heading 
    heading="My Tech Stack" 
    subheading="Tools & Technologies I Use to Build Programs" 
    subicon="fas fa-tools" 
  />

  <div class="stacks mt-10">
    <div class="swiper-container swiper-right w-full px-4 py-6 flex opacity-90 justify-center items-center">
      <div class="swiper-wrapper flex justify-center gap-5">
        {#each techStackRight as stack}
          <div class="swiper-slide flex justify-start items-center gap-4 w-[210px] p-4 bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 rounded-2xl shadow-xl transition-all group">
            <img class="tech-icon w-10 h-10 object-contain group-hover:scale-110 transition-transform" src={`https://skillicons.dev/icons?i=${stack.icon}`} alt={stack.name} /> 
            <h4 class="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{stack.name}</h4>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <div class="max-w-2xl mx-auto px-4">
    <Typewriter
      Class="text-center font-medium text-base sm:text-lg mt-10 leading-relaxed text-neutral-300"
      text="I am constantly exploring and mastering the latest tools and technologies to create scalable, high-performance applications."
      typingSpeed={50}
      replay={false}
    />
  </div>
</section>

<style>
  .swiper-container {
    width: 95%;
    overflow: hidden;
    margin: 20px auto;
  }
</style>
