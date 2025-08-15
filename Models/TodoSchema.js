import mongoose from "mongoose";
const Schema=mongoose.Schema
export const TodoSchema = new Schema(
  {
    name: String,
    title:{type: String, required: true},
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todos", TodoSchema);
export default Todo;
