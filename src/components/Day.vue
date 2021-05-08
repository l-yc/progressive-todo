<template>
  <div class="day">
    <input
      type="date"
      :value="day.date"
      @input="$emit('update:day-date', $event.target.value)"
    />
    <div class="tasks">
      <Task
        v-for="(task, idx) in day.tasks"
        :key="idx"
        :task="task"
        @update:task-state="$emit('update:day-tasks', { idx, prop: 'state', val: $event })"
        @update:task-name="$emit('update:day-tasks', { idx, prop: 'name', val: $event })"
        @remove:task="$emit('remove:day-tasks', idx)"
      />
      <div class="controls flex-row justify-center">
        <button @click="$emit('add:day-tasks')">New</button>
        <button @click="$emit('remove:day')">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Task from "@/components/Task.vue";

export default defineComponent({
  name: "Day",
  components: {
    Task,
  },
  props: {
    day: JSON,
  },
  created() {
    console.log("this.day", this.day);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.day {
  box-shadow: 0 0 1.6px 0.4px #ccc;
  padding: 2rem 4rem;
  margin: 1rem;
}

.day .controls button {
  margin: 1rem 1rem 0 0;
}

</style>
