// Import all import files
const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "I have to complete this todo",
    },
    time: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    isimportant: {
      type: Boolean,
      default: false,
    },
    isWorking: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
