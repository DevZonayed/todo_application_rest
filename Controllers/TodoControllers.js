// All Todo Controller
// This controller to Create a todo

const Todo = require("../Models/TodoModel");
const User = require("../Models/UserModel");

/**
 * This Controller for Create an Todo Items
 * @param {*} req
 * @param {*} res
 */
async function CreateTodo(req, res) {
  const todo = req.body;
  try {
    const todoData = new Todo({
      ...todo,
      user: req.user_id,
    });

    const finalData = await todoData.save();

    // User Updates
    const userQuary = { _id: req.user_id };

    await User.updateOne(userQuary, {
      $push: {
        todos: finalData._id,
      },
    });

    res.status(201).json({
      message: "Todo Created Successfully",
      data: finalData,
    });
  } catch (err) {
    res.status(502).json({
      message: `Data Add fail ! Something went wrong Error ${err}`,
    });
  }
}

// Create Todo End Here

async function UpdateTodo(req, res) {
  const id = await req.params.id;
  try {
    const updateRawValue = req.body;
    const updateQuary = { _id: id };
    const updateValue = await Todo.updateOne(updateQuary, updateRawValue);

    // Save Values
    res.status(202).json({
      message: "Todo Updated",
      data: updateValue,
    });
  } catch (err) {
    res.status(403).json({
      message: `Todo Update Field ! Error ${err}`,
    });
  }
}

// Get All Todos
async function getTodos(req, res) {
  try {
    const Quary = { user: req.user_id };
    const mySort = { isimportant: -1 };
    const allTodo = await Todo.find(Quary, "-user").sort(mySort);

    res.status(200).json({
      message: `Data Get Successful`,
      data: allTodo,
    });
  } catch (err) {
    res.status(403).json({
      message: `Something went wrong Todo Get fail... ! Error :  ${err}`,
    });
  }
}

// Delete Todo
async function DeleteTodo(req, res) {
  const { id } = req.params;
  try {
    const deleteQuary = { _id: id };
    const deleteTodo = await Todo.deleteOne(deleteQuary);

    // Delete Data From User Registry
    const userQuary = { _id: req.user_id };
    await User.updateOne(userQuary, {
      $pull: {
        todos: id,
      },
    });

    res.status(200).json({
      message: "data delete success",
      data: deleteTodo,
    });
  } catch (err) {
    res.status(403).json({
      message: `Something went wrong Todo Delete fail... ! Error :  ${err}`,
    });
  }
}

module.exports = { CreateTodo, UpdateTodo, getTodos, DeleteTodo };
