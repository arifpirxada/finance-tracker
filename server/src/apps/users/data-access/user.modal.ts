import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from 'types';

const supportedCurrencies = [
  'USD', // US Dollar
  'EUR', // Euro
  'INR', // Indian Rupee
  'GBP', // British Pound
  'JPY', // Japanese Yen
  'AUD', // Australian Dollar
  'CAD', // Canadian Dollar
  'CHF', // Swiss Franc
  'CNY', // Chinese Yuan
  'SEK', // Swedish Krona
  'NZD', // New Zealand Dollar
  'SGD', // Singapore Dollar
  'HKD', // Hong Kong Dollar
  'ZAR', // South African Rand
  'AED', // UAE Dirham
];

const accountSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Cash', 'Bank account', 'Other'],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, 'Balance cannot be negative']
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    accounts: [accountSchema],
    currency: {
      type: String,
      enum: supportedCurrencies,
      default: 'INR'
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model<IUser>('user', userSchema);

export default UserModel;
