export interface IComment {
  commentID: string;
  username: string;
  body: string;
  postDate: Date;
  topLevel: boolean;
  replies: string[];
  replyTo: string;
}

export interface ICommentTree {
  commentID: string;
  username: string;
  body: string;
  postDate: Date;
  topLevel: boolean;
  replies: ICommentTree[];
  replyTo: string;
}