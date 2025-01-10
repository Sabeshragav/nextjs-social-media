import userModel from "./userModel"; // Adjust the path to where your user model is defined
import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user", // Matches the name used in userModel
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const promptModel = models.prompt || model("prompt", promptSchema);

export default promptModel;
