class TodoList {
  name: string;
  days: Day[];

  constructor(json: any) {
    const casted = <TodoList>json;
    this.name = casted.name;
    this.days = casted.days;

    console.log(this.name, this.days, casted);
  }
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
