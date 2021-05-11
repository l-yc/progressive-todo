class TodoList {
  public name: string;
  public days: Day[];

  constructor(json: any) {
    this.name = json.name;
    this.days = [];
    for (const d of json.days) {
      this.days.push(new Day(d));
    }
  }

  public getDay(id: string): Day {
    const idx: number = this.days.findIndex(d => d.id == id);
    return this.days[idx];
  }
}

class Day {
  id: string;
  date: string;
  tasks: Task[];

  constructor(json: any) {
    this.id = json.id;
    this.date = json.date;
    this.tasks = [];
    for (const t of json.tasks) {
      this.tasks.push(new Task(t));
    }
  }

  public getTask(id: string): Task {
    const idx: number = this.tasks.findIndex(d => d.id == id);
    return this.tasks[idx];
  }
}

class Task {
  id: string;
  state: boolean;
  name: string;

  constructor(json: any) {
    this.id = json.id;
    this.state = json.state;
    this.name = json.name;
  }
}

export { TodoList, Day, Task };
