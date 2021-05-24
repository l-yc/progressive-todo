<template>
  <div class="track">
    <!--<h1>Progressive Todo</h1>-->
    <div class="medium-container">
      <div id="controls">
        <button @click="toggle">{{ handler === null ? "Start" : "Pause" }}</button>
        <button @click="reset">Reset</button>
      </div>
      <div id="clock">
        <h1>{{ timer }}</h1>
        <h1 contenteditable>Keep going!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Track",
  components: {},
  data() {
    return {
      elapsed: 0,
      handler: null,
    };
  },
  computed: {
    timer() {
      let date = new Date(0);
      date.setSeconds(this.elapsed); // specify value for SECONDS here
      let timeString = date.toISOString().substr(11, 8);
      return timeString;
    }
  },
  methods: {
    toggle() {
      if (this.handler !== null) {
        window.clearInterval(this.handler);
        this.handler = null;
      } else {
        this.handler = setInterval(this.tick, 1000);
      }
    },
    reset() {
      if (this.handler !== null) {
        this.toggle();
      }
      this.elapsed = 0;
      this.handler = null;
    },
    tick() {
      this.elapsed += 1;
    },
  },
});
</script>

<style scoped="true">
#controls button {
  margin: 1rem 0.5rem 0 0.5rem;
}
</style>
