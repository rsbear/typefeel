// text post

export interface PostInterface {
  id: string;
  body: string;
  created: any;
  createdAt: any;
  user: {
    username: string;
  }
}