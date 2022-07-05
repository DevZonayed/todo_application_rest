// Import all Required Files
const express = require("express");
const {
  CreateTodo,
  UpdateTodo,
  getTodos,
  DeleteTodo,
} = require("../Controllers/TodoControllers");

// Route Initialize
const TodoRoute = express.Router();

// Handle Routes

// Create a todo Item
TodoRoute.post("/CreateTodo", CreateTodo);

// Update A tODO
TodoRoute.post("/UpdateTodo/:id", UpdateTodo);

// Read All Todos
TodoRoute.get("/getTodos", getTodos);

// Delete a todo
TodoRoute.get("/deleteTodo/:id", DeleteTodo);

module.exports = TodoRoute;
