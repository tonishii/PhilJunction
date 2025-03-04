import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  // username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  title: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  body: { type: String, required: true },
  images: [{ data: Buffer, contentType: String }],
  tags: [{ type: String }],

  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
})

const Posts = mongoose.model("Post", postSchema);
export default Posts;