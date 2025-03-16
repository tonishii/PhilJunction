export interface IComment {
  commentID?: string;
  username: string;
  body: string;
  postDate?: Date;
  publicId: string;
  parentId: string;
  replies: IComment[];
}