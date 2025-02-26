const { todoDatabase } = require("../utils");
const path = require("path");
const fsPromise = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

function validateTodo(task) {
  if (!task || typeof task !== "string") {
    return { valid: false, message: "task is required and must be a string" };
  }

  return { valid: true };
}

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
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const validation = validateTodo(body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const newTodo = { id: uuidv4(), done: false, ...body };
    const updatedTodos = [...todoDatabase.todos, newTodo];

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "data.json"),
      JSON.stringify(updatedTodos, null, 2)
    );

    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create todo" });
  }

  //updating todos in json file
}

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    //body not found
    if (!body || body == {}) {
      return res.status(400).send("Request body is missing");
    }

    const validation = validateTodo(body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const todo = todoDatabase.todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    const updatedTodo = { ...todo, ...body };
    const updatedTodos = todoDatabase.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
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
