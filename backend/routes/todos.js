const express = require("express");
const {
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  createTodo,
} = require("../controllers/todos");

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router
  .route("/:id")
  .get(getTodoById)
  .patch(updateTodoById)
  .delete(deleteTodoById);

module.exports = router;
