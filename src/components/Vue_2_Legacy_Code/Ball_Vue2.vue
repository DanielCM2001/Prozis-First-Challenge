<!-- Vue 2 - Legacy code -->
<template>
  <!-- The ball style is dynamically computed based on the component data -->
  <div class="ball" :style="ballStyle"></div>
</template>

<script>
export default {
  // Props received from parent component (Playground_Vue2.vue)
  props: {
    id: Number,
    size: Number,
    color: String,
    startX: Number,
    startY: Number,
    velocityX: Number,
    velocityY: Number,
  },
  data() {
    return {
      // Initial position and velocity values from props
      x: this.startX,
      y: this.startY,
      vx: this.velocityX,
      vy: this.velocityY,
      gravity: 9.81, // Constant acceleration due to gravity
      timeInterval: 20, // Interval in milliseconds
    };
  },
  computed: {
    // Computes the style object based on component data
    ballStyle() {
      return {
        width: `${this.size}px`, // Width based on size prop
        height: `${this.size}px`, // Height based on size prop
        backgroundColor: this.color, // Background color based on color prop
        left: `${this.x}px`, // Dynamically sets horizontal position based on x data property
        top: `${this.y}px`, // Dynamically sets vertical position based on y data property
      };
    },
  },
  mounted() {
    // Starts the animation of the ball
    this.move();
  },
  methods: {
    // This function is responsible for the ball movement by updating it's position over time
    move() {
      setInterval(() => {
        const t = this.timeInterval / 1000; // Convert to seconds
        this.x += this.vx * t; //Update horizontal position
        this.y += this.vy * t - 0.5 * this.gravity * t * t; // Update vertical position considering gravity
        this.vy += this.gravity * t; // Update vertical velocity due to gravity

        // Check page limits and if the ball as reached them (Both on X and Y)
        if (this.x <= 0 || this.x + this.size >= window.innerWidth) {
          this.vx *= -0.9; // Reverse and reduce horizontal velocity by 10%
          this.x = this.x <= 0 ? 0 : window.innerWidth - this.size; // Adjust position to stay within window bounds
        }

        if (this.y <= 0 || this.y + this.size >= window.innerHeight) {
          this.vy *= -0.9; // Reverse and reduce vertical velocity by 10%
          this.y = this.y <= 0 ? 0 : window.innerHeight - this.size; // Adjust position to stay within window bounds
        }
      }, this.timeInterval); //Interval for updating position
    },
  },
};
</script>

<style scoped>
.ball {
  position: absolute;
  border-radius: 50%;
}
</style>
