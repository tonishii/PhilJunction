import { Comment } from "@/models/commentType";

const userCommentData: Comment[] = [
  {
    username: "Fubuki",
    replyTo: "Mio",
    commentID: "1",
    postDate: new Date(),
    body: "I like glasses too!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Marine",
    commentID: "3",
    postDate: new Date(),
    body: "I think glasses are cute!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Aqua",
    commentID: "6",
    postDate: new Date(),
    body: "Wow?!?!?!",
    replies: []
  }
];

export default userCommentData;