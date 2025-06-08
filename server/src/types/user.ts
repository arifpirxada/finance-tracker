import { Document, Types } from 'mongoose';

export interface IAccount {
  _id: Types.ObjectId;
  name: string;
  type: 'Cash' | 'Bank account' | 'Other';
  balance: number;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  accounts: IAccount[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
