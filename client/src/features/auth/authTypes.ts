export interface Account {
    _id: string,
    name: string,
    type: "Bank account" | "Cash" | "Other",
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