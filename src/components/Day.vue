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
      <div ref="taskContainer">
        <TaskComponent
          v-for="task in day.tasks"
          :key="task.id"
          :did="day.id"
          :task="task"
          @focusLast="focusLast()"
        />
      </div>
      <div class="controls flex-row justify-center">
        <button @click="$store.commit('addTask', { day: day.id })">New</button>
        <button @click="$store.commit('removeDay', { day: day.id })">
          Delete
        </button>
        <button @click="startRound()" :disabled="currentTask != -1">
          Start
        </button>
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
import Sortable from "sortablejs";

export default defineComponent({
  name: "Day",
  components: {
    TaskComponent,
  },

  props: {
    day: { type: Object as () => Day, required: true },
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

  mounted() {
    let el: HTMLElement = this.$refs.taskContainer as HTMLElement;
    Sortable.create(el, {
      onChange: (evt) => {
        this.$store.commit("reorderTask", {
          day: this.day.id,
          oldIndex: evt.oldIndex,
          newIndex: evt.newIndex,
        });
      },
    });
  },

  methods: {
    startRound() {
      let result: boolean = window.confirm(
        "Are you sure you want to begin this round of scheduling?"
      );
      if (result) {
        ++this.round;
        this.schedule();
      }
    },

    schedule() {
      let pool: Task[] = this.day.tasks.filter((t) => !t.state);
      if (pool.length === 0) {
        this.endRound();
      } else {
        let task: number = _.random(0, pool.length - 1);
        this.message = `Round ${this.round}: ${pool[task].name}`;
        this.currentTask = task;
      }
    },

    endRound() {
      this.message = `Round ${this.round} ended. Good job!`;
      this.currentTask = -1;
    },

    focusLast() {
      this.$nextTick(() => {
        let el: HTMLElement = this.$refs.taskContainer as HTMLElement;
        console.log(el.lastElementChild.querySelector("input"));
        el.lastElementChild.querySelector("input.name").focus();
      });
    },
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
