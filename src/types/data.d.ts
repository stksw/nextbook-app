import Image from 'next/image';

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  displayName: string;
  profileImageUrl: string;
  description: string;
};

export type Category = 'shoes' | 'clothes' | 'book';

export type Condition = 'new' | 'used';

export type Product = {
  id: number;
  category: Category;
  title: string;
  description: string;
  imageUrl: string;
  blurDataUrl: string;
  price: number;
  owner: User;
  condition: Condition;
};

export type ApiContext = {
  apiRootUrl: string;
};
