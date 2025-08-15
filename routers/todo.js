import express from "express";
const router = express.Router();
import Todo from "../Models/TodoSchema.js";
import chalk from "chalk";

router.get("/getTodo", async (req, res) => {
  const { Todos } = req.query;
  try {
    let getAll = await Todo.find();
    console.log("Fetching all todos", getAll);
    res.status(200).json(getAll);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

router.post("/addTodo", async (req, res) => {
  try {
    let todo = new Todo({ ...req.body });
    await todo.save();
    console.log("Todo saved:", todo);
    res.status(201).json({ message: "Todo saved successfully", todo });
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).json({ error: "Failed to save todo" });
  }
});

  router.put("/updateTodo/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let findTodo = await Todo.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      if (findTodo) {
        console.log(chalk.green("Todo updated successfully:", findTodo));
        res.status(200).json({ message: "Todo updated successfully", findTodo });
      }
      if (!findTodo) {
        console.log(chalk.red("Todo not found with id:", id));
        res.status(404).json({ error: "Todo not found" });
      }
      console.log(chalk.blue("Found todo:", findTodo));
    } catch (error) {
      console.error(chalk.red("Error updating todo:", error));
      res.status(500).json({ error: "Failed to update todo" });
    }
  });
router.delete("/deleteTodo/:id", async (req, res) => {
  const { id } = req.params;
  console.log("req.params=>",req.params)
  try {
    let deleteTodo=await Todo.findByIdAndDelete(id)
    if(deleteTodo){
      console.log(chalk.green("Todo deleted successfully:", id));
      res.status(200).json({ message: "Todo deleted successfully" });
    }
    if (!deleteTodo) {
      console.log(chalk.red("Todo not found with id:", id));
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(chalk.red("Error deleting todo:", error));
    res.status(500).json({ error: "Failed to delete todo" });
  }
})

export default router;
