export interface ImageBuffer {
  imageUrl: string;
  contentType: string;
}

export interface IPost {
  publicId: string;
  username: string;
  title: string;
  postDate: Date;
  body: string;
  images: ImageBuffer[];
  tags: string[];
  likes: number;
  dislikes: number;
  comments: string[];
  origin?: { id: string, place: string};
  destination?: { id: string, place: string };
}
