<!-- Heading.svelte -->
<script lang="ts">
  export let heading = '';
  export let subheading = '';
  export let subicon = '';
</script>

<div class="flex justify-center items-center flex-col text-center mb-6">
  {#if subheading}
    <div 
      class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 shadow-lg shadow-emerald-500/5 backdrop-blur-md" 
      data-aos="zoom-out"
    >
      {#if subicon}
        <i class="{subicon} text-emerald-400"></i>
      {/if}
      <span>{subheading}</span>
    </div>
  {/if}
  <h2 
    class="heading font-extrabold text-3xl sm:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500" 
    data-aos="zoom-in"
  >
    {heading}
  </h2>
</div>