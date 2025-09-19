export class Task {
  private static idCounter = 1;
  public readonly id: number;
  public status: "pending" | "done";

  constructor(
    public title: string,
    public dueDate: Date,
    public priority: "low" | "medium" | "high"
  ) {
    this.id = Task.idCounter++;
    this.status = "pending";
  }

  markAsDone(): void {
    this.status = "done";
  }

  static setNextId(id: number): void {
    Task.idCounter = id;
  }

  editTask(
    updates: Partial<{
      title: string;
      dueDate: Date;
      priority: "low" | "medium" | "high";
    }>
  ): void {
    if (updates.title) {
      this.title = updates.title;
    }
    if (updates.dueDate) {
      this.dueDate = updates.dueDate;
    }
    if (updates.priority) {
      this.priority = updates.priority;
    }
  }
}
