import { models, model, Schema } from "mongoose";

const TodoSchema = new Schema({
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = models?.todos || model("todos", TodoSchema);

export default Todo;
