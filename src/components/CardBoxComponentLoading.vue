<script>
export default {
  name: 'CardBoxComponentLoading',
  props: {
    title: {
      type: String,
      default: 'Loading...'
    },
    duration: {
      type: String,
      default: '2.5s'
    },
    height: {
      type: String,
      default: 'h-24'
    },
    padding: {
      type: String,
      default: 'py-24'
    },
    bold: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
<div class='flex space-x-2 justify-center items-center text-gray-500 dark:text-gray-400' :style="{'--animation-duration': duration}" :class="`${height} ${padding} ${bold ? 'font-bold' : ''}`">
 	<span class='sr-only'>Loading...</span>
  
<div class='h-4 w-4 animate-bounce [animation-delay:0s] '>L</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.15s] '>O</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.3s] '>A</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.45s] '>D</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.6s] '>I</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.75s] '>N</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-0.9s] '>G</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-1.05s] '>.</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-1.2s] '>.</div>
<div class='h-4 w-4 animate-bounce [animation-delay:-1.35s] '>.</div>

</div>

</template>

<style>
  .animate-bounce {
    animation-duration: var(--animation-duration, 2.5s);
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: center bottom;
    animation-name: fadeInOut;
  }

  /* Translate X fade in and out */
  @keyframes fadeInOut {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(20px);
      opacity: 0;
    }
  }

  

</style>