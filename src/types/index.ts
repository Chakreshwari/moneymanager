export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    userId: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    type: TransactionType;
}

export interface Budget {
    category: string;
    limit: number;
    spent: number;
}
