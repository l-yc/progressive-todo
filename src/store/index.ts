import { createStore } from "vuex";

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { TodoList, Day, Task } from "@/types.ts";

const load = () => {
  // for debugging
  const savedState: string | null = localStorage.getItem("todo");
  let data: any;
  if (savedState === null) {
    data = {
      name: "default",
      days: [
        {
          id: uuidv4(),
          date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
          tasks: [
            { id: uuidv4(), state: false, name: "thdy ws" },
            { id: uuidv4(), state: false, name: "sr ws" },
          ],
        },
      ],
    };
  } else {
    console.log("No saved data. Loaded default test data.");
    data = JSON.parse(savedState);
  }

  console.log("todo data %o", data);
  return new TodoList(data);
};

const store = createStore({
  state: {
    todo: load(),
  },

  getters: {
    todo: (state) => {
      return state.todo;
    },
  },

  mutations: {
    addDay(state) {
      state.todo.days.unshift(
        new Day({
          id: uuidv4(),
          date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
          tasks: [new Task({ id: uuidv4(), state: false, name: "" })],
        })
      );
    },

    carryDay(state) {
      const clone: Day = new Day({
        id: uuidv4(),
        date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
        tasks: _.cloneDeep(state.todo.days[0].tasks),
      });
      state.todo.days.unshift(clone);
    },

    removeDay(state, evt) {
      const idx: number = state.todo.days.findIndex((d) => d.id == evt.day);
      state.todo.days.splice(idx, 1);
    },

    updateDayDate(state, evt) {
      state.todo.getDay(evt.day).date = evt.newVal;
    },

    addTask(state, evt) {
      state.todo.getDay(evt.day).tasks.push(
        new Task({
          id: uuidv4(),
          state: false,
          name: "",
        })
      );
    },

    removeTask(state, evt) {
      console.log("evt", evt);
      const day: Day = state.todo.getDay(evt.day);
      const idx: number = day.tasks.findIndex((t) => t.id == evt.task);
      day.tasks.splice(idx, 1);
    },

    reorderTask(state, evt) {
      const day: Day = state.todo.getDay(evt.day);
      const task: Task = day.tasks[evt.oldIndex];
      day.tasks.splice(evt.oldIndex, 1);
      day.tasks.splice(evt.newIndex, 0, task);
    },

    updateTaskState(state, evt) {
      const day: Day = state.todo.getDay(evt.day);
      const task: Task = day.getTask(evt.task);
      task.state = evt.val;
    },

    updateTaskName(state, evt) {
      console.log(state.todo);
      const day: Day = state.todo.getDay(evt.day);
      const task: Task = day.getTask(evt.task);
      task.name = evt.val;
    },
  },

  actions: {
    saveData(context) {
      console.log("saving", JSON.stringify(context.getters.todo));
      localStorage.setItem("todo", JSON.stringify(context.getters.todo));
    },
  },
});

store.subscribe((_mutation, _state) => {
  _.debounce(() => store.dispatch("saveData"), 500)();
});

export default store;
