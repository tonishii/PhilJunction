export interface IPostImage {
  imageUrl: string;
  contentType: string;
}

export interface IPost {
  publicId: string;
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: IPostImage[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: string[];
}
