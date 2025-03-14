export interface IComment {
  commentID: string | null;
  username: string;
  body: string;
  postDate: Date;
  replyTo: string;
  replies: IComment[];
}