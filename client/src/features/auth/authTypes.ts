export interface Account {
    _id: string,
    name: string,
    type: 'income' | 'expense' | 'transfer',
    balance: number
}

export interface User {
    id: string,
    name: string,
    email: string,
    accounts: Account[]
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}