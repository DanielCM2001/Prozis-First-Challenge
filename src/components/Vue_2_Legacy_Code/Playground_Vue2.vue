<!-- Vue 2 - Legacy code -->

<template>
  <!-- This div dynamically sets a class that applies a background to the page based on a condition (If there are no balls yet)
   and also listens for click events to create a new ball  -->
  <div
    @click="createBall"
    :class="['playground', { 'bg-playground-image': balls.length === 0 }]"
  >
    <!-- If no balls exist, show the initial message and a "How it works" button that shows the instructions -->
    <div v-if="balls.length === 0" class="space-y-5 text-center text-white">
      <div class="space-y-0">
        <h1
          class="text-3xl font-extrabold tracking-tight italic text-[#D70901]"
        >
          PROZIS
        </h1>
        <h1 class="text-2xl font-bold tracking-tight italic">
          Exceed yourself !
        </h1>
      </div>

      <!-- Animated start message -->
      <h1
        class="text-6xl font-bold animate-pulse cursor-pointer"
        id="initialMessage"
      >
        TAP TO START
      </h1>

      <!-- How it works/Explanation button -->
      <button
        class="bg-[#D70901] hover:bg-[#d70801c7] font-semibold py-2 px-4 rounded-full"
        @click.stop="toggleExplanation"
      >
        How it works?
      </button>

      <!-- Explanation of the ball challenge with condition (if the how it works button was clicked) -->
      <div v-if="showExplanation" class="space-y-5">
        <h1 class="text-xl">Ball Challenge</h1>

        <p>
          Whenever a click occurs on the page, a ball is created with a random
          color and a size between 50px and 100px.
        </p>
        <p>
          As soon as the ball is created, it is launched with a random speed and
          direction.
        </p>
        <p>
          Whenever the ball reaches one of the page boundaries, its speed
          decreases by 10% and its direction is reversed.
        </p>
      </div>
    </div>

    <!-- Renders a new ball based on the 'balls' array -->
    <Ball
      v-for="ball in balls"
      :key="ball.id"
      :id="ball.id"
      :size="ball.size"
      :color="ball.color"
      :startX="ball.startX"
      :startY="ball.startY"
      :velocityX="ball.velocityX"
      :velocityY="ball.velocityY"
    />
  </div>
</template>

<script>
import Ball from "./Ball_Vue2.vue";

const MIN_BALL_SIZE = 50; // Minimum size for the balls
const MAX_BALL_SIZE = 100; // Maximum size for the balls

export default {
  components: {
    Ball,
  },

  data() {
    return {
      balls: [], // Array to store created balls
      nextId: 1, // ID counter for new balls
      showExplanation: false, // Flag to control the visibility of the explanation
    };
  },
  methods: {
    createBall(event) {
      const size = this.getRandomSize(); // Generates a random size for the ball

      let color;
      do {
        color = `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`;
        // Generate random color for the ball in hexadecimal format
      } while (color === "#f0f0f0"); // Ensure the color is not the same as the background

      // Calculate initial X and Y position
      const startX = event.clientX - size / 2;
      const startY = event.clientY - size / 2;

      //Generate random X and Y velocity by calling the getRandomVelocity function
      const velocityX = this.getRandomVelocity();
      const velocityY = this.getRandomVelocity();

      // Push the new ball into the 'balls' array
      this.balls.push({
        id: this.nextId++, // Assign a unique ID
        size,
        color,
        startX,
        startY,
        velocityX,
        velocityY,
      });
    },

    /* This functions generates a random size for the balls (Within the requested size on the Avatar PDF (50px to 100px)) */
    getRandomSize() {
      return Math.random() * (MAX_BALL_SIZE - MIN_BALL_SIZE) + MIN_BALL_SIZE;
    },

    // This functions generates a random velocity
    getRandomVelocity() {
      return (Math.random() - 0.5) * 1000;
    },

    // Function to toggle the visibility of the explanation section
    toggleExplanation() {
      this.showExplanation = !this.showExplanation;
    },
  },
};
</script>

<style scoped>
.playground {
  margin: 0;
  overflow: hidden;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-playground-image {
  background: url("../../assets/imgs/BallsBackground.jpg") no-repeat center
    center;
  background-size: cover;
}
</style>
