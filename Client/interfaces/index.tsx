export interface User {
  email: string;
  id: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  entries: Entry[];
}

export interface Entry {
  amount: string;
  category: string;
  createdAt: string;
  currency: string | null;
  date: string;
  description: string | null;
  id: number;
  item: string;
  payment: null;
  updatedAt: string;
  userId: number;
  [key: string]: any;
}

export interface UserInput {
  email: string;
  password: string;
}
