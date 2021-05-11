import { createStore } from "vuex";

import _ from "lodash";

import { TodoList, Day, Task } from "@/types.ts";

const store = createStore({
  state: {
    todo: { type: TodoList },
  },

  getters: {
    todo: (state) => {
      return state.todo;
    },
  },

  mutations: {

    load: (state) => {
      // for debugging
      const savedState: string | null = localStorage.getItem("todo");
      let data: any;
      if (savedState === null) {
        data = {
          name: "name",
          days: [
            {
              date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
              tasks: [
                { state: false, name: "thdy ws" },
                { state: false, name: "sr ws" },
              ],
            },
          ]
        };
      } else {
        console.log("No saved data. Loaded default test data.");
        data = JSON.parse(savedState);
      }

      console.log("todo data %o", data);
      state.todo = new TodoList(data);
    },

    addDay(state) {
      state.todo.unshift({
        date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
        tasks: [{ state: false, name: "" }],
      });
    },

    carryDay(state) {
      state.todo.unshift(_.cloneDeep(state.todo[0]));
    },

    removeDay(state, evt) {
      state.todo.splice(evt.day, 1);
    },

    updateDayDate(state, evt) {
      state.todo[evt.day].date = evt.newVal;
    },

    addTask(state, evt) {
      state.todo[evt.day].tasks.push({ state: false, name: "" });
    },

    removeTask(state, evt) {
      state.todo[evt.day].tasks.splice(evt.task, 1);
    },

    updateTaskState(state, evt) {
      state.todo[evt.day].tasks[evt.task].state = evt.val;
    },

    updateTaskName(state, evt) {
      state.todo[evt.day].tasks[evt.task].name = evt.val;
    },
  },

  actions: {
    saveData(context) {
      console.log("saving", JSON.stringify(context.getters.todo));
      localStorage.setItem("todo", JSON.stringify(context.getters.todo));
    },
  }
});

store.subscribe((mutation, state) => {
  //_.debounce(() => store.dispatch('saveData'), 500)();
})

export default store;
