// text post

export interface PostInterface {
  id: string;
  body: string;
  created: any;
  user: {
    username: string;
  }
}