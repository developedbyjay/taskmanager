import * as fs from "fs";
import { Task } from "./Task";
import { addDays } from "date-fns";

export type Priority = "low" | "medium" | "high";
export class TaskManager {
  private tasks: Task[] = [];
  private readonly filePath = "tasks.json";

  constructor() {
    this.loadTasks();
  }

  addTask(title: string, dueDate: Date, priority: Priority): void {
    if (!["low", "medium", "high"].includes(priority)) {
      console.log(
        ` "${priority}" does not include the set options, you can either choose `
      );
      return;
    }
    const task = new Task(title, dueDate, priority);
    this.tasks.push(task);
    this.saveTasks();
    console.log(`✅ Task "${title}" added!`);
  }

  listTasks(): void {
    if (this.tasks.length === 0) {
      console.log("📭 No tasks found.");
      return;
    }

    this.logTasks(this.tasks);
  }

  markAsDone(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.log("❌ Task not found.");
      return;
    }
    task.markAsDone();
    this.saveTasks();
    console.log(`✅ Task "${task.title}" marked as done!`);
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log("❌ Task not found.");
      return;
    }
    const removed = this.tasks.splice(index, 1);
    this.saveTasks();
    console.log(`🗑️ Task "${removed[0].title}" deleted!`);
  }
  sortTasks(by: "dueDate" | "priority" | "status"): void {
    let sorted: Task[] = [];

    switch (by) {
      case "dueDate":
        sorted = [...this.tasks].sort(
          (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
        );
        break;

      case "priority":
        // Define priority order
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        sorted = [...this.tasks].sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        break;

      case "status":
        const statusOrder = { pending: 1, done: 2 };
        sorted = [...this.tasks].sort(
          (a, b) => statusOrder[a.status] - statusOrder[b.status]
        );
        break;

      default:
        console.log("❌ Invalid sort option.");
        return;
    }

    console.log(`\n📋 Sorted by ${by}:`);
    this.logTasks(sorted);
  }
  editTask(
    id: number,
    updates: Partial<{
      title: string;
      dueDate: Date;
      priority: Priority;
    }>
  ): void {
    if (!id) {
      console.log("Id is needed to edit ");
      return;
    }
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      console.log("The task does not exist");
      return;
    }
    task.editTask({ ...updates });
    this.saveTasks();
  }

  filterTask(updates: { priority?: Priority; status?: string }): void {
    if (!updates.priority && !updates.status) {
      const today = new Date();
      const threeDaysLater = addDays(today, 3);

      const filterTask = this.tasks.filter(
        (task) => task.dueDate >= today && task.dueDate <= threeDaysLater
      );
      this.logTasks(filterTask);
      return;
    }

    const filteredTasks = this.tasks.filter(
      (task) =>
        (!updates.priority || task.priority === updates.priority) &&
        (!updates.status || task.status === updates.status)
    );

    if (this.tasks.length === 0) {
      console.log("No tasks found.");
    } else {
      this.logTasks(filteredTasks);
    }
  }

  private logTasks(tasks: Task[]): void {
    tasks.forEach((task) => {
      console.log(
        `#${task.id} [${task.status}] ${
          task.title
        } (Due: ${task.dueDate.toDateString()}, Priority: ${task.priority})`
      );
    });
  }

  private saveTasks(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
  }

  private loadTasks(): void {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      const taskData = JSON.parse(data);
      this.tasks = taskData;
      this.tasks = taskData.map((taskObj: Task) => {
        const task = new Task(
          taskObj.title,
          new Date(taskObj.dueDate),
          taskObj.priority
        );
        (task as any).id = taskObj.id;
        task.status = taskObj.status;

        return task;
      });

      // console.log(this.tasks);

      if (this.tasks.length > 0) {
        const maxId = Math.max(...this.tasks.map((t) => t.id));
        Task.setNextId(maxId + 1);
      }
    }
  }
}
