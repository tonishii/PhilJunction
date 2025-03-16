import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: { data: Buffer; contentType: string }[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: mongoose.Types.ObjectId[];
  publicId: string;
}

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  publicId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  body: { type: String, required: true },
  images: [{ data: Buffer, contentType: String }],
  tags: [{ type: String, required: true }],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;