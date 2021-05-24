<template>
  <div class="track">
    <!--<h1>Progressive Todo</h1>-->
    <div class="medium-container">
      <div id="controls">
        <button @click="toggle">{{ handler === null ? "Start" : "Pause" }}</button>
        <button @click="reset">Reset</button>
        <button @click="log">Log</button>
      </div>
      <div id="clock">
        <h1 ref="name" contenteditable>Timer Name</h1>
        <h1>{{ timer }}</h1>
        <h1 contenteditable>Keep going!</h1>
      </div>
      <div id="history">
        <div v-for="h in history" v-bind:key="h.id">
          <span @click="erase(h.id)">&times;</span>
          {{ h.name }}: {{ formatElapsed(h.time) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "Track",
  components: {},
  data() {
    return {
      elapsed: 0,
      handler: null,
      history: [],
    };
  },
  computed: {
    timer() {
      return this.formatElapsed(this.elapsed);
    }
  },
  created() {
    let json = JSON.parse(localStorage.getItem("track-history") || "[]");
    this.history = json;
  },
  methods: {
    formatElapsed(elapsed) {
      let date = new Date(0);
      date.setSeconds(elapsed); // specify value for SECONDS here
      let timeString = date.toISOString().substr(11, 8);
      return timeString;
    },
    tick() {
      this.elapsed += 1;
    },
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
    log() {
      this.history.unshift({
        id: uuidv4(),
        name: this.$refs.name.innerText,
        time: this.elapsed,
      });
      this.saveData();
    },
    erase(id) {
      let i = -1;
      for (let j = 0; j < this.history.length; ++j) {
        if (this.history[j].id == id) {
          i = j;
          break;
        }
      }
      if (i == -1) throw "history item not found";
      this.history.splice(i, 1);
      this.saveData();
    },
    saveData() {
      localStorage.setItem("track-history", JSON.stringify(this.history));
    },
  },
});
</script>

<style scoped="true">
#controls button {
  margin: 1rem 0.5rem 0 0.5rem;
}
</style>
