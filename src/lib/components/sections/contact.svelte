<script>
  import Heading from '$lib/components/reusable/heading.svelte';
  import Button from "$lib/components/reusable/button.svelte";    
  import Typewriter from '$lib/components/reusable/typer.svelte';
  import emailjs from '@emailjs/browser';

  const socialLinks = [
    { icon: 'fab fa-github', username: 'ForceClose31', medialink: 'https://github.com/ForceClose31' },
    { icon: 'fab fa-linkedin', username: 'Nur Bashori Rahmat Oktavianto Herman', medialink: 'https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/' },

  ];

  let formState = false;
  let isLoading = false;

  function toggleFormVisibility() {
    formState = !formState;
  }

  emailjs.init('ZPSqEIGndLqo2otUd');

</script>

<section id="contact">
  <Heading 
    heading="Let's Connect" 
    subicon="fas fa-link" 
  />

  <Typewriter
    Class="text-center mb-4 font-medium text-xl mt-10 leading-relaxed"
    text="Contact me here and let's build a good relationship."
    typingSpeed={50}
    replay={false}
  />

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6 mb-6 justify-center items-center">
    {#each socialLinks as Links}
      <a href={Links.medialink} target="_blank" rel="noopener noreferrer" class="flex px-7 py-5 bg-bg justify-between items-center w-full rounded-[30px] mb-4">
        <div class="flex mr-5 items-center justify-center gap-3">
          <i class={`bgt xl:text-3xl text-2xl ${Links.icon}`}></i>
          <h3 class="text-xl xl:text-2xl text-gradient">@{Links.username}</h3>
        </div>
        <div>
          <svg width="30" height="30" viewBox="0 0 25 25" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9203 6.0505C18.7834 5.86991 18.5665 5.75324 18.3223 5.75315L9.32695
            5.75C8.91265 5.74985 8.57667 6.08545 8.57653 6.49958C8.57638 6.9137 8.91212
            7.24954 9.32643 7.24968L16.5172 7.2522L5.79779 17.9716C5.5049 18.2645 5.5049
            18.7394 5.79779 19.0323C6.09069 19.3252 6.56556 19.3252 6.85845 19.0323L17.5725
            8.31828L17.5748 15.4945C17.5749 15.9086 17.9109 16.2442 18.3252 16.2441C18.7395
            16.244 19.0752 15.9081 19.0751 15.494L19.0722 6.56074C19.0853 6.38214 19.0346
            6.19976 18.9203 6.0505Z" fill="#fff"/>
          </svg>
        </div>
      </a>
    {/each}
  </div>
  
  {#if formState}
    <div class="navigation fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
      <div class="nav-body w-[450px] sm:w-[400px] md:w-[500px] xl:w-[550px] rounded bg-white p-6">
        <div class="nav-head px-4 py-4 flex justify-between items-center">
          <div class="flex items-center justify-center gap-1">
            <h3 class="text-2xl mb-0.5 mr-2">Send Me an Email</h3>
          </div>
          <i class="fas fa-x cursor-pointer" on:click={toggleFormVisibility}></i>
        </div>
        
        <div class="nav-footer flex-col flex justify-center items-center mb-4 mt-8">
          <p class="text-base">Powered by EmailJS</p>
        </div>
      </div>
    </div>
  {/if}

  {#if isLoading}
    <div class="loader fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div class="spinner border-8 border-t-8 border-transparent border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  {/if}
</section>


<style>
  .loader .spinner {
    border-top-color: #0071e2;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
.navigation,.nav-body{
    transition: 0.3s all ease-in;

}

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
