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
    margin: {
      type: String,
      default: 'mb-4'
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssProps() {
      return {
        '--animation-duration': this.duration
      }
    }
  },
  methods: {
    getAnimationDelay(index) {
      const delay = parseFloat(this.duration) / 20;
      return `animation-delay: -${delay * index}s`;
    }
  }
}
</script>

<template>
  <div class='flex space-x-2 justify-center items-center text-gray-500 dark:text-gray-400 md:p-4'
    :class="`${height} ${padding} ${bold ? 'font-bold' : ''} ${margin}`"
    :style="cssProps">
    <span class='sr-only'>{{ title }}</span>

    <div v-for="(letter, index) in ['L', 'O', 'A', 'D', 'I', 'N', 'G']"
      :key="index"
      class='h-4 w-4 animate-bounce'
      :style="getAnimationDelay(index)">
      {{ letter }}
    </div>
  </div>
</template>

<style>
.animate-bounce {
  animation-duration: var(--animation-duration);
  animation-iteration-count: infinite;
  animation-timing-function: linear; /* Updated: changed from ease-in-out to linear */
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