import mongoose from 'mongoose';

export interface Account {
  _id: mongoose.Types.ObjectId;
  name: string;
  type: 'Cash' | 'Bank account' | 'Other';
  balance: number;
}

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  accounts: Account[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
