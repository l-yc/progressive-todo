import { createStore } from "vuex";

import _ from "lodash";

import { Day } from "@/types.ts";

const store = createStore({
  state: {
    todo: [] as Day[], // todo is a array of day JSON objects
  },

  getters: {
    todo: (state) => {
      return state.todo;
    },

    doneTodo: (state) => {
      return state.todo.filter((t) => t.state);
    },
  },

  mutations: {

    load: (state) => {
      // for debugging
      let savedState: string | null = localStorage.getItem("todo");
      let data: Day[];
      if (savedState === null) {
        data = [
          {
            date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
            tasks: [
              { state: false, name: "thdy ws" },
              { state: false, name: "sr ws" },
            ],
          },
        ];
        //localStorage.setItem("todo", JSON.stringify());
      } else {
        console.log("No saved data. Loaded default test data.");
        data = JSON.parse(savedState);
      }

      console.log("todo data %o", data);
      for (let a of data) {
        state.todo.push(a);
      }
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

    removeDay(state, idx: number) {
      state.todo.splice(idx, 1);
    },

    updateDate(state, idx: number, evt: any) {
      // FIXME shouldn't use any
      state.todo[idx].date = evt;
      state.todo.splice(idx, 1, state.todo[idx]);
      console.log(state.todo);
    },

    updateTasks(state, idx: number, evt: any) {
      // FIXME
      state.todo[idx].tasks[evt.idx][evt.prop] = evt.val;
      state.todo.splice(idx, 1, state.todo[idx]);
      console.log(state.todo);
    },

    addTask(state, idx: number) {
      state.todo[idx].tasks.push({ state: false, name: "" });
    },

    removeTask(state, idx: number, i2: number) {
      state.todo[idx].tasks.splice(i2, 1);
    },

    saveData(state) {
      console.log("saving", JSON.stringify(state.todo));
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

  },
});

//_.debounce(this.saveData, 500)();

export default store;
