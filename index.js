const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

const fetchTodos = async () => {
  try {
    const data = fs.readFileSync("./todo.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

program.name("todo-app").description("CLI to todo-app").version("0.8.0");

program
  .command("show")
  .description("Lists all todos")
  .action(async () => {
    const todos = await fetchTodos();
    console.log(todos);
  });

program
  .command("add")
  .argument("<task>", "task to add")
  .description("Add todo")
  .action(async (task) => {
    const todos = await fetchTodos();
    todos.push({
      id: Math.ceil(Math.random() * 1000),
      task: task,
      completed: false,
    });
    console.log(todos);
    fs.writeFileSync("./todo.json", JSON.stringify(todos));
  });

program
  .command("delete")
  .argument("<id>", "task to delete")
  .description("Add todo")
  .action(async (id) => {
    const todos = await fetchTodos();
    const idx = todos.findIndex((todo) => todo.id == id);
    todos.splice(idx, 1);
    console.log(todos);
    fs.writeFileSync("./todo.json", JSON.stringify(todos));
  });

program
  .command("update")
  .argument("<id>", "id")
  .argument("<task>", "task")
  .description("Update task")
  .action(async (id, task) => {
    const todos = await fetchTodos();
    const idx = todos.findIndex((todo) => todo.id == id);
    todos[idx].task = task;
    console.log(todos);
    fs.writeFileSync("./todo.json", JSON.stringify(todos));
  });

program
  .command("completed")
  .argument("<id>", "id")
  .argument("<boolean>", "value")
  .description("Mark as completed")
  .action(async (id, value) => {
    const todos = await fetchTodos();
    const idx = todos.findIndex((todo) => todo.id == id);
    const isCompleted = value == "true" ? true : false;
    todos[idx].completed = isCompleted;
    console.log(todos);
    fs.writeFileSync("./todo.json", JSON.stringify(todos));
  });

program.parse();
