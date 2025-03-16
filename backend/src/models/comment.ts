import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  username: string;
  userId: mongoose.Types.ObjectId;
  body: string;
  publicId: string;
  parentId: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  publicId: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }]
}, { timestamps: true });

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;