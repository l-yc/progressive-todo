<template>
  <div class="home">
    <!--<h1>Progressive Todo</h1>-->
    <div class="medium-container">
      <div id="controls">
        <button @click="addDay()">New day</button>
        <button @click="carryDay()">Carry over</button>
      </div>
      <div id="board">
        <!--<Day v-for="(day, idx) in todo" v-bind:key="idx" v-model:day="todo[idx]" />-->
        <Day
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
import Day from "@/components/Day.vue";
import _ from "lodash";

export default defineComponent({
  name: "Home",
  components: {
    Day,
  },
  data() {
    return {
      todo: [], // todo is a array of day JSON objects
    };
  },
  created() {
    // for debugging
    if (localStorage.getItem("todo") === null) {
      localStorage.setItem("todo", JSON.stringify([
        {
          date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
          tasks: [
            { state: false, name: "thdy ws" },
            { state: false, name: "sr ws" },
          ]
        },
      ]));
    }

    let data = JSON.parse(localStorage.getItem("todo"));
    console.log("todo data %o", data);

    this.todo = data;
  },
  watch: {
    todo: {
      handler(newVal, oldVal) {
        console.log("watching", newVal, oldVal);
        _.debounce(this.saveData, 500)();
      },
      deep: true,
    }
  },
  methods: {
    addDay() {
      this.todo.unshift({
        date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
        tasks: [{ state: false, name: "" }],
      });
    },
    carryDay() {
      this.todo.unshift(_.cloneDeep(this.todo[0]));
    },
    removeDay(idx) {
      this.todo.splice(idx, 1);
    },
    updateDate(idx, evt) {
      this.todo[idx].date = evt;
      this.todo.splice(idx, 1, this.todo[idx]);
      console.log(this.todo);
    },
    updateTasks(idx, evt) {
      this.todo[idx].tasks[evt.idx][evt.prop] = evt.val;
      this.todo.splice(idx, 1, this.todo[idx]);
      console.log(this.todo);
    },
    addTask(idx) {
      this.todo[idx].tasks.push({ state: false, name: "" });
    },
    removeTask(idx, i2) {
      this.todo[idx].tasks.splice(i2, 1);
    },
    saveData() {
      console.log("saving", JSON.stringify(this.todo));
      localStorage.setItem("todo", JSON.stringify(this.todo));
    }
  },
});
</script>

<style scoped="true">
#controls button {
  margin: 1rem 1rem 0 0;
}
</style>
