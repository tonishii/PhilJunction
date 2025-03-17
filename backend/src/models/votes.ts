import mongoose from 'mongoose';

export interface IVote extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  publicId: String;
  type: Boolean;
}

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  publicId: { type: String, required: true },
  type: { type: Boolean }
})

const Vote = mongoose.model<IVote>("Vote", voteSchema);
export default Vote;
