<!-- Heading.svelte -->
<script lang="ts">
  export let heading = '';
  export let subheading = '';
  export let subicon = '';
</script>

<div class="flex justify-center items-center flex-col text-center mb-6">
  {#if subheading}
    <div 
      class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 shadow-sm backdrop-blur-md" 
      data-aos="zoom-out"
    >
      {#if subicon}
        <i class="{subicon} text-emerald-500"></i>
      {/if}
      <span>{subheading}</span>
    </div>
  {/if}
  <h2 
    class="heading font-extrabold text-3xl sm:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-emerald-500 to-[var(--text-secondary)]" 
    data-aos="zoom-in"
  >
    {heading}
  </h2>
</div>