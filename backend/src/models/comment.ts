import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  body: string;
  postDate?: Date;
  replyTo?: mongoose.Types.ObjectId | null;
  replies?: mongoose.Types.ObjectId[];
}

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;