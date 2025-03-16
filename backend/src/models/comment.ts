import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  body: string;
  username: string;
  replyTo: string;
  replies: mongoose.Types.ObjectId[];
  topLevel: boolean;
}

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  replyTo: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  topLevel: { type: Boolean, required: true }
}, { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;