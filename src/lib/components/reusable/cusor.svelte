<script>
// @ts-nocheck

  let cursor;

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;

    requestAnimationFrame(() => {
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  };

  const handleClick = () => {
    cursor.classList.add("mag");
    setTimeout(() => {
      cursor.classList.remove("mag");
    }, 500);
  };

  import { onMount } from "svelte";

  onMount(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  });
</script>

<div bind:this={cursor} class="cursor"></div>

<style>
  .cursor {
    position: fixed;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(8,243,140,0.6), rgba(0,113,226,0.3));
    border-radius: 50%;
    filter: blur(10px);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.3s ease;
    z-index: 9999;
  }


  @keyframes click-effect {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .cursor.mag {
    background: radial-gradient(circle, rgba(255, 99, 71, 0.7), rgba(255, 99, 71, 0.3));
    animation: click-effect 0.5s forwards;
  }
</style>
