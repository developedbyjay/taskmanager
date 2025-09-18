import { TaskManager } from "./taskmanager";
import * as readline from "readline";

const taskManager = new TaskManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n📋 Task Manager CLI");
  console.log("1. Add Task");
  console.log("2. List Tasks");
  console.log("3. Mark Task as Done");
  console.log("4. Delete Task");
  console.log("5. Edit Task");
  console.log("6. Exit");
}

function mainMenu() {
  showMenu();
  rl.question("\nChoose an option: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Task title: ", (title) => {
          rl.question("Due date (YYYY-MM-DD): ", (due) => {
            rl.question("Priority (low/medium/high): ", (priority) => {
              taskManager.addTask(title, new Date(due), priority as any);
              mainMenu();
            });
          });
        });
        break;
      case "2":
        taskManager.listTasks();
        mainMenu();
        break;
      case "3":
        rl.question("Enter task ID: ", (id) => {
          taskManager.markAsDone(Number(id));
          mainMenu();
        });
        break;
      case "4":
        rl.question("Enter task ID: ", (id) => {
          taskManager.deleteTask(Number(id));
          mainMenu();
        });
        break;
      case "5":
        rl.question("Enter task ID: ", (id) => {
          rl.question(
            "Enter task title, press enter if you do not want to edit the title: ",
            (title) => {
              rl.question(
                "Enter due date, press enter if you do not want to edit the due date: ",
                (dueDate) => {
                  rl.question(
                    "Enter priority , press enter if you do not want to edit priority :",
                    (priority) => {
                      const updates = {} as {
                        title: string;
                        dueDate: Date;
                        priority: "low" | "medium" | "high";
                      };

                      if (title) updates.title = title;
                      if (dueDate) updates.dueDate = new Date(dueDate);
                      if (priority)
                        updates.priority = priority as
                          | "low"
                          | "medium"
                          | "high";

                      taskManager.editTask(Number(id), updates);
                      mainMenu();
                    }
                  );
                }
              );
            }
          );
        });
        break;
      case "6":
        console.log("👋 Goodbye!");
        rl.close();
        break;
      default:
        console.log("❌ Invalid choice.");
        mainMenu();
    }
  });
}

mainMenu();
