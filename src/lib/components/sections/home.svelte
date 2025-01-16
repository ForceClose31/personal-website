<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import Typewriter from '$lib/components/reusable/typer.svelte';  
  import Button from "$lib/components/reusable/button.svelte";
        
  let vantaEffect;

  onMount(() => {
    if (typeof VANTA !== 'undefined' && VANTA.DOTS) {
      // @ts-ignore
      vantaEffect = VANTA.DOTS({
        el: "#about",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 20.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xe91a1,
        color2: 0x363636,
        backgroundColor: 0x0,
        size: 10.0,
        spacing: 19.0,
        showLines: false
      });
    } else {
      console.error('VANTA or VANTA.DOTS is not defined');
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  });

  const socials = [
    { Socialicon: "fab fa-github", link: "https://github.com/ForceClose31" },
    { Socialicon: "fab fa fa-envelope-o", link: "mailto:forceclose31@gmail.com" },
    { Socialicon: "fab fa-linkedin", link: "https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/" }
  ];
</script>

<section class="head" id="about">
  <header class="flex justify-center items-center flex-col text-center">
    <Typewriter
      Class="greet py-2 px-4 text-xl bgt font-bold"
      text="Hi, I'm Nur Bashori Rahmat Oktavianto Herman"
      typingSpeed={80}
      replay={false}
    />

    <h1 data-aos="fade-down" class="text-gradient text-3xl leading-relaxed
    font-bold mt-4 capitalize">I create scalable systems and innovative applications to empower businesses and enhance user experiences.</h1>

    <Typewriter
      Class="text-center font-medium text-xl mt-6 mb-7 leading-relaxed"
      text="With expertise in backend, mobile, and fullstack development, I design robust, user-friendly solutions that tackle real-world challenges effectively."
      typingSpeed={70}
      replay={false}
    />

    <div class="flex items-center gap-4 mt-7" data-aos="fade-right">
      {#each socials as { Socialicon, link }}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <i class={`social-icon text-2xl ${Socialicon}`}></i>
        </a>
      {/each}
    </div>

    <Button text="Let's Talk"
    link="https://wa.me/6281393418944"
    />
  </header>
</section>
