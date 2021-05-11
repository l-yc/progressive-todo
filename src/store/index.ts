import { createStore } from "vuex";

const store = createStore({
  state: {
    todos: [],
  },

  getters: {
    todos: (state) => {
      return state.todos;
    },

    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.state);
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
        state.todos.push(a);
      }
    },
  }
});

export default store;
