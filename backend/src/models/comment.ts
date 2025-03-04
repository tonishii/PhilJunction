import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  // username: { type: String, required: true },\
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  body: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  // replyTo: { type: String, default: null },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
})

const Comments = mongoose.model("Comment", commentSchema);
export default Comment;