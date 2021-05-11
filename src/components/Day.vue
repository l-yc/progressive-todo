<template>
  <div class="day">
    <input
      type="date"
      :value="day.date"
      @input="$store.commit('updateDayDate', id, $event.target.value)"
    />
    <div class="tasks">
      <TaskComponent
        v-for="(task, idx) in day.tasks"
        :key="idx"
        :did="id"
        :id="idx"
        :task="task"
      />
      <div class="controls flex-row justify-center">
        <button @click="$store.commit('addTask', id)">New</button>
        <button @click="$store.commit('removeDay', id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskComponent from "@/components/Task.vue";
import { Day } from "@/types.ts";

export default defineComponent({
  name: "Day",
  components: {
    TaskComponent,
  },
  props: {
    id: { type: Number },
    day: { type: Number },
  },
  created() {
    console.log("this.day", this.day);
  },
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
