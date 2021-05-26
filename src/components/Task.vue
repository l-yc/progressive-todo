<template>
  <div class="task">
    <input
      class="state"
      type="checkbox"
      :checked="task.state"
      id="state"
      @change="
        $store.commit('updateTaskState', {
          day: did,
          task: task.id,
          val: $event.target.checked,
        })
      "
    />
    <input
      ref="input"
      class="name"
      type="text"
      :value="task.name"
      @input="
        $store.commit('updateTaskName', {
          day: did,
          task: task.id,
          val: $event.target.value,
        })
      "
      @keydown.enter="
        $store.commit('addTask', { day: did });
        $emit('focusLast');
      "
      @keydown.delete="
        if ($event.target.value === '') {
          $event.preventDefault();
          $store.commit('removeTask', { day: did, task: task.id });
          $emit('focusLast');
        }
      "
    />
    <span @click="$store.commit('removeTask', { day: did, task: task.id })">
      &times;
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Task } from "@/types.ts";

export default defineComponent({
  name: "Task",
  props: {
    did: String,
    task: { type: Object as () => Task, required: true },
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task {
  position: relative;

  display: flex;
  flex-flow: row nowrap;
}

.task:hover::after {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;

  display: flex;
  align-items: center;
  font-size: 1rem;
  //content: "⨯";
  color: #ccc;
}

.task:hover::after:hover {
  cursor: pointer;
}

.task .state {
  margin-right: 1rem;
  font-size: 1rem;
  padding: 1rem;
}

.task .name {
  border: none;
  border-bottom: 2px solid #fff0;
  margin-bottom: 0;
  padding: 0.5rem;
  line-height: 1rem;

  &:focus,
  &:active {
    border: none;
    border-bottom: 2px solid black;
    box-shadow: none;
  }
}
</style>
