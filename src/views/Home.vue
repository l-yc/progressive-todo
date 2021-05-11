<template>
  <div class="home">
    <!--<h1>Progressive Todo</h1>-->
    <div class="medium-container">
      <div id="controls">
        <button @click="addDay()">New day</button>
        <button @click="carryDay()">Carry over</button>
      </div>
      <div id="board">
        <DayComponent
          v-for="(day, idx) in todo"
          :key="idx"
          :day="day"
          @remove:day="removeDay(idx)"
          @update:day-date="updateDate(idx, $event)"
          @update:day-tasks="updateTasks(idx, $event)"
          @add:day-tasks="addTask(idx)"
          @remove:day-tasks="removeTask(idx, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DayComponent from "@/components/Day.vue";
import _ from "lodash";

export default defineComponent({
  name: "Home",
  components: {
    DayComponent,
  },
  data() {
    return {};
  },
  created() {
    this.$store.commit("load");
  },
  methods: {},
});
</script>

<style scoped="true">
#controls button {
  margin: 1rem 1rem 0 0;
}
</style>
