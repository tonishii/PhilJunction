export interface IComment {
  commentID: string;
  username: string;
  body: string;
  postDate?: Date;
  replyTo?: string;
  replies?: IComment[];
}