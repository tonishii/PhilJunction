export interface IBuffer {
  data: Buffer;
  contentType: string;
}

export interface IPost {
  publicId: string;
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: IBuffer[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: string[];
}
