const { todoDatabase } = require("../utils/utils");
const path = require("path");
const fsPromise = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

async function getAllTodos(req, res) {
  try {
    const data = todoDatabase.todos;
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Error retriving todos form server");
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = todoDatabase.todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error getting todo:", error);
    return res.status(500).json({ error: "Failed to retrieve todo" });
  }
}

async function createTodo(req, res) {
  try {
    const {
      title,
      description = null,
      dueDate = null,
      priority = "low",
    } = req.body;

    const newTodo = {
      id: uuidv4(),
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: false,
    };
    const updatedTodos = [...todoDatabase.todos, newTodo];

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "data.json"),
      JSON.stringify(updatedTodos, null, 2)
    );

    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create todo" });
  }
}

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const todo = todoDatabase.todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    // Update only the fields provided in the request body
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (priority !== undefined) todo.priority = priority;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodos = todoDatabase.todos.map((eachTodo) =>
      todo.id === id ? todo : eachTodo
    );
    todoDatabase.setTodos(updatedTodos);

    //updating todos in json file
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "data.json"),
      JSON.stringify(updatedTodos, null, 2)
    );

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update todo" });
  }
}

async function deleteTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = todoDatabase.todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    const todos = todoDatabase.todos.filter((todo) => todo.id !== id);

    //updating todos in json file
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "data.json"),
      JSON.stringify(todos, null, 2)
    );
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete todo" });
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  createTodo,
};
