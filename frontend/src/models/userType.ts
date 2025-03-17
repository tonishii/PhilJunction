import { ImageBuffer } from "./postType";

export interface IUser {
  userID: string;
  username: string;
  email: string;
  description: string;
  icon: ImageBuffer;
  password: string;
  dateCreated: Date;
}