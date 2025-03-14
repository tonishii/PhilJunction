export interface IPost {
  postID: string;
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: Blob[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: string[];
  publicId: string;
}
