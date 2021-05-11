import { createStore } from "vuex";

const store = createStore({
  state: {
    todos: [],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.state);
    },
  },
});

export default store;
