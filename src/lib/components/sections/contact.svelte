<script lang="ts">
  import Heading from '$lib/components/reusable/heading.svelte';
  import Typewriter from '$lib/components/reusable/typer.svelte';
  import emailjs from '@emailjs/browser';

  const socialLinks = [
    { icon: 'fab fa-github', username: 'ForceClose31', medialink: 'https://github.com/ForceClose31' },
    { icon: 'fab fa-linkedin', username: 'Nur Bashori Rahmat Oktavianto Herman', medialink: 'https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/' }
  ];

  let formState = false;
  let isLoading = false;

  function toggleFormVisibility() {
    formState = !formState;
  }

  emailjs.init('ZPSqEIGndLqo2otUd');
</script>

<section id="contact" class="py-20">
  <Heading 
    heading="Let's Connect" 
    subicon="fas fa-link" 
  />

  <Typewriter
    Class="text-center mb-6 font-medium text-base sm:text-lg mt-8 leading-relaxed max-w-xl mx-auto text-neutral-300 px-4"
    text="Contact me here and let's build a great relationship or collaborate on exciting projects."
    typingSpeed={50}
    replay={false}
  />

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-8 max-w-4xl mx-auto px-4">
    {#each socialLinks as Links}
      <a 
        href={Links.medialink} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="flex px-6 py-5 bg-neutral-950/80 backdrop-blur-2xl border border-white/10 hover:border-emerald-500/40 justify-between items-center w-full rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl group hover:shadow-emerald-500/10"
      >
        <div class="flex items-center gap-4 min-w-0">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <i class={`text-2xl ${Links.icon}`}></i>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
            @{Links.username}
          </h3>
        </div>
        <div class="text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
          <svg width="24" height="24" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9203 6.0505C18.7834 5.86991 18.5665 5.75324 18.3223 5.75315L9.32695 5.75C8.91265 5.74985 8.57667 6.08545 8.57653 6.49958C8.57638 6.9137 8.91212 7.24954 9.32643 7.24968L16.5172 7.2522L5.79779 17.9716C5.5049 18.2645 5.5049 18.7394 5.79779 19.0323C6.09069 19.3252 6.56556 19.3252 6.85845 19.0323L17.5725 8.31828L17.5748 15.4945C17.5749 15.9086 17.9109 16.2442 18.3252 16.2441C18.7395 16.244 19.0752 15.9081 19.0751 15.494L19.0722 6.56074C19.0853 6.38214 19.0346 6.19976 18.9203 6.0505Z"/>
          </svg>
        </div>
      </a>
    {/each}
  </div>
  
  {#if formState}
    <div class="navigation fixed inset-0 flex justify-center items-center z-50 bg-black/80 backdrop-blur-md">
      <div class="nav-body w-[450px] sm:w-[400px] md:w-[500px] xl:w-[550px] rounded-3xl bg-neutral-900 border border-white/10 p-6 shadow-2xl">
        <div class="nav-head px-4 py-4 flex justify-between items-center border-b border-white/10">
          <div class="flex items-center justify-center gap-1">
            <h3 class="text-2xl font-bold text-white">Send Me an Email</h3>
          </div>
          <button on:click={toggleFormVisibility} class="text-neutral-400 hover:text-white p-2" aria-label="Close Email Form">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div class="nav-footer flex-col flex justify-center items-center mb-4 mt-8">
          <p class="text-sm text-neutral-400">Powered by EmailJS</p>
        </div>
      </div>
    </div>
  {/if}

  {#if isLoading}
    <div class="loader fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm">
      <div class="spinner border-4 border-t-4 border-white/20 border-t-emerald-400 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  {/if}
</section>
