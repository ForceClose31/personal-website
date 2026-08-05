<script lang="ts">
  export let text = "";
  export let Class = "";
  export let link = "";
  export let onClick = () => {};
</script>

{#if link}
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button 
      class={`rounded-full px-6 py-2.5 min-w-[140px] font-bold text-sm bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 shadow-md ${Class}`} 
      data-aos="fade-up"
      on:click={onClick}
    >
      {text}
    </button>
  </a>
{:else}
  <button 
    class={`rounded-full px-6 py-2.5 min-w-[140px] font-bold text-sm bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 shadow-md ${Class}`} 
    data-aos="fade-up"
    on:click={onClick}
  >
    {text}
  </button>
{/if}
