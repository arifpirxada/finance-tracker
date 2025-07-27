export interface Transaction {
    _id: string,
    userId: string,
    type: 'income' | 'expense' | 'transfer',
    note: string,
    amount: number,
    tags: string[],
    account: string,
    toAccount: string,
    date: string
}