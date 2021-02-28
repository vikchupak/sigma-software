const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
