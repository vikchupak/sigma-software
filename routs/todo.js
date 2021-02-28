const { Router } = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const router = Router();

// /todo/create
router.post(
  "/create",
  [
    authMiddleware,
    check("title").not().isEmpty().withMessage("Title is empty."),
    check("content").not().isEmpty().withMessage("Content is empty."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array().map((error) => error.msg).join(" "),
        });
      }

      const { title, content } = req.body;

      const todo = new Todo({
        title,
        content,
        owner: req.user.userId,
      });

      await todo.save();

      res.status(201).json({ todo });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Ooops, something went wrong. Please, try again." });
    }
  }
);

// /todo
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Ooops, something went wrong. Please, try again." });
  }
});

// /todo/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Ooops, something went wrong. Please, try again." });
  }
});

module.exports = router;
