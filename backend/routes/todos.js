const express = require("express");
const { body, param } = require("express-validator");
const {
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  createTodo,
} = require("../controllers/todos");
const { validate } = require("../utils/routesUtil");

const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(
    body("title")
      .trim()
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title is required"),
    body("description")
      .optional()
      .trim()
      .isString()
      .withMessage("Description must be a string"),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid ISO 8601 date"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be one of 'low', 'medium', or 'high'"),
    validate,
    createTodo
  );
router
  .route("/:id")
  .get(
    param("id")
      .isMongoId()
      .withMessage("Invalid ID format. ID must be a valid MongoDB ObjectId"),
    validate,
    getTodoById
  )
  .patch(
    param("id")
      .isMongoId()
      .withMessage("Invalid ID format. ID must be a valid MongoDB ObjectId"),
    body("title")
      .optional()
      .trim()
      .isString()
      .withMessage("Title must be a string"),
    body("description")
      .optional()
      .trim()
      .isString()
      .withMessage("Description must be a string"),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid ISO 8601 date"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be one of 'low', 'medium', or 'high'"),
    body("completed")
      .optional()
      .custom((value) => typeof value === "boolean")
      .withMessage("Completed must be a boolean (either true or false)"),
    validate,
    updateTodoById
  )
  .delete(
    param("id")
      .isMongoId()
      .withMessage("Invalid ID format. ID must be a valid MongoDB ObjectId"),
    validate,
    deleteTodoById
  );

module.exports = router;
