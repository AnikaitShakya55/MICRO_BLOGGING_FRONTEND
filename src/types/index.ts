export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Blog {
  _id: string;
  content: string;
  user: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  user: User;
  blog: string;
  createdAt: string;
}
