import { IComment } from "./commentType";

export interface IPost {
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: Blob[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: IComment[];
  publicId: string;
}
