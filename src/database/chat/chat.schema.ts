import {Document, Schema, model} from "mongoose";

export interface IChatMessage extends Document {
  email: string,
  type: string,
  date: string,
  body: string
}

const ChatMessageSchema = new Schema<IChatMessage>({
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default model<IChatMessage>("message", ChatMessageSchema);

