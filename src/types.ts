interface TodoList {
  name: string;
  days: Day[];
}

interface Task {
  state: boolean;
  name: string;
}

interface Day {
  date: string;
  tasks: Task[];
}

export { TodoList, Task, Day };
