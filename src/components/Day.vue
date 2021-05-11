<template>
  <div class="day">
    <input
      type="date"
      :value="day.date"
      @input="
        $store.commit('updateDayDate', { day: id, val: $event.target.value })
      "
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
        <button @click="$store.commit('addTask', { day: id })">New</button>
        <button @click="$store.commit('removeDay', { day: id })">Delete</button>
        <button @click="startRound()" :disabled="currentTask != -1">Start</button>
      </div>
      <div class="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskComponent from "@/components/Task.vue";
import { Day, Task } from "@/types.ts";
import _ from "lodash";

export default defineComponent({
  name: "Day",
  components: {
    TaskComponent,
  },

  props: {
    id: { type: Number },
    day: { type: Object as () => Day },
  },

  data() {
    return {
      roundStarted: false,
      message: "",
      round: 0,
      currentTask: -1,
    };
  },

  watch: {
    day: {
      deep: true,
      handler(newVal) {
        if (this.currentTask != -1 && newVal.tasks[this.currentTask].state) {
          this.schedule();
        }
      },
    },
  },

  methods: {
    startRound() {
      let result: boolean = window.confirm("Are you sure you want to begin this round of scheduling?");
      if (result) {
        ++this.round;
        this.schedule();
      }
    },

    schedule() {
      let pool: Task[] = this.day.tasks.filter(t => !t.state);
      if (pool.length === 0) {
        this.endRound();
      } else {
        let task: number = _.random(0, pool.length-1);
        this.message = `Round ${this.round}: ${pool[task].name}`;
        this.currentTask = task;
      }
    },

    endRound() {
      this.message = `Round ${this.round} ended. Good job!`;
      this.currentTask = -1;
    }
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
  margin: 1rem 1rem 1rem 0;
}

button[disabled] {
  filter: brightness(50%);
}

button[disabled]:hover {
  cursor: not-allowed;
}

.message {
  padding: 1rem;
}
</style>
