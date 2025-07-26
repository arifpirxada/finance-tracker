import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    amount: {
      type: Number,
      required: true,
    },
    note: String,
    account: mongoose.Schema.Types.ObjectId,
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      set: (v: any) => (v === "" ? null : v)
    },
    type: {
      type: String,
      enum: ['expense', 'income', 'transfer'],
      required: true,
    },
    tags: [String],
    date: Date,
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('transaction', transactionSchema);

export default TransactionModel;
