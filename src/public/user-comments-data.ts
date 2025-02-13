import type { PostComment } from "@/mockdata/post-data";

const userCommentData: PostComment[] = [
  {
    username: "Fubuki",
    replyTo: "Mio",
    id: 1,
    content: "I like glasses too!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Marine",
    id: 3,
    content: "I think glasses are cute!",
    replies: []
  },
  {
    username: "Fubuki",
    replyTo: "Aqua",
    id: 6,
    content: "Wow?!?!?!",
    replies: []
  }
];

export default userCommentData;