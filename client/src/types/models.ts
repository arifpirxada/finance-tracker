export interface Transaction {
  _id: string;
  userId: string;
  type: "income" | "expense" | "transfer";
  note: string;
  amount: number;
  tags: string[];
  account: string;
  toAccount: string;
  date: string;
}

export interface Account {
  _id: string;
  name: string;
  type: "Bank account" | "Cash" | "Other";
  balance: number;
}
