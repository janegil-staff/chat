import { model, models, Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const messageSchema = Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
