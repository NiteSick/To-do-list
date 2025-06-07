const Todos = require("../model/Todos");

async function getAllTodos(req, res) {
  try {
    const userId = req.user.id;
    console.log("User id is ", userId);
    const data = await Todos.find({ userId });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Error retriving todos form server ", err);
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    console.log("Id value is ", id);
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json({ error: err });
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

    await Todos.create({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: false,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Todo created successfully" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    // Update only the fields provided in the request body
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (priority !== undefined) todo.priority = priority;
    if (completed !== undefined) todo.completed = completed;

    await Todos.findByIdAndUpdate(id, todo);

    res.status(200).json({ message: `Todo updated successfully with value ` });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function deleteTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    await Todos.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  createTodo,
};
