import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
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
