class TodoList {
  public name: string;
  public days: Day[];

  public getDay(id: string): Day {
    const idx: number = this.days.findIndex(d => d.id == evt.day);
    return this.days[idx];
  }
}

class Day {
  id: string;
  date: string;
  tasks: Task[];

  public getTask(id: string): Task {
    const idx: number = this.tasks.findIndex(d => d.id == evt.day);
    return this.tasks[idx];
  }
}

class Task {
  id: string;
  state: boolean;
  name: string;
}

export { TodoList, Day, Task };
