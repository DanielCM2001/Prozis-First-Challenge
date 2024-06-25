<!-- Vue 3 - New Version -->

<template>
  <!-- The ball style is dynamically based on the component props and reactive variables -->
  <div class="ball" :style="ballStyle"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define props received from parent component (Playground.vue)
const props = defineProps({
  id: Number,
  size: Number,
  color: String,
  startX: Number,
  startY: Number,
  velocityX: Number,
  velocityY: Number,
});

// Define reactive variables for position and velocity
const x = ref(props.startX);
const y = ref(props.startY);
const vx = ref(props.velocityX);
const vy = ref(props.velocityY);

// Constants
const gravity = 9.81; // Constant acceleration due to gravity
const timeInterval = 20; // Interval in milliseconds

// Reactive object to dynamically update ball style
const ballStyle = ref({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: props.color,
  left: `${x.value}px`,
  top: `${y.value}px`,
});

onMounted(() => {
  move(); //Start the ball animation
});

// This function is responsible for the ball movement by updating it's position over time
const move = () => {
  setInterval(() => {
    const t = timeInterval / 1000; // Convert interval to seconds
    x.value += vx.value * t; // Update horizontal position
    y.value += vy.value * t - 0.5 * gravity * t * t; // Update vertical position considering gravity
    vy.value += gravity * t; // Update vertical velocity due to gravity

    // Update the style object with new position values
    ballStyle.value = {
      ...ballStyle.value,
      left: `${x.value}px`,
      top: `${y.value}px`,
    };

    // Check page limits and if the ball as reached them (Both on X and Y)
    if (x.value <= 0 || x.value + props.size >= window.innerWidth) {
      vx.value *= -0.9; // Reverse and reduce horizontal velocity by 10%
      x.value = x.value <= 0 ? 0 : window.innerWidth - props.size;
    }
    if (y.value <= 0 || y.value + props.size >= window.innerHeight) {
      vy.value *= -0.9; //  Reverse and reduce vertical velocity by 10%
      y.value = y.value <= 0 ? 0 : window.innerHeight - props.size;
    }
  }, timeInterval);
};
</script>
<script>
export default {
  name: "Ball", // Add this name property
};
</script>

<style scoped>
.ball {
  position: absolute;
  border-radius: 50%;
}
</style>
