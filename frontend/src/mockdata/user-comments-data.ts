import type { PostComment } from "@/mockdata/post-data";

const userCommentData: PostComment[] = [
  {
    username: "Fubuki",
    replyTo: "Mio",
    id: 1,
    postDate: new Date(),
    content: "I like glasses too!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Marine",
    id: 3,
    postDate: new Date(),
    content: "I think glasses are cute!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Aqua",
    id: 6,
    postDate: new Date(),
    content: "Wow?!?!?!",
    replies: []
  }
];

export default userCommentData;