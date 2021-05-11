interface Task {
  state: boolean;
  name: string;
}

interface Day {
  date: string;
  tasks: Task[];
}

export { Task, Day };
