import { Priority, TaskManager } from "./taskmanager";
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
  console.log("6. Filter Task");
  console.log("7. Sort Tasks");
  console.log("8. Exit");
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
        rl.question(
          "How do you want to filter?  \n1. Priority \n2. Status \n3. Due soon\n",
          (option) => {
            let filter: { [key: string]: string } = {};
            switch (option) {
              case "1":
                rl.question(
                  "Enter the priority level to filter (low,medium,high) \n",
                  (priority: string) => {
                    filter.priority = priority;
                    taskManager.filterTask(filter);
                    filter = {};
                    mainMenu();
                  }
                );
                break;
              case "2":
                rl.question(
                  "Enter the status to filter by (pending,success,failed) \n",
                  (status: string) => {
                    filter.status = status;
                    taskManager.filterTask(filter);
                    filter = {};
                    mainMenu();
                  }
                );

                break;
              case "3":
                taskManager.filterTask(filter);
                mainMenu();
                break;
              default:
                console.log("Invalid choice");
                mainMenu();
            }
          }
        );
        break;
      case "7":
        rl.question("Sort by (dueDate/priority/status): ", (sortBy) => {
          taskManager.sortTasks(sortBy as "dueDate" | "priority" | "status");
          mainMenu();
        });
        break;
      case "8":
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
