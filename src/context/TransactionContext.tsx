import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction } from '../types';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (data: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...data,
            id: crypto.randomUUID(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const updateTransaction = (updated: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    return (
        <TransactionContext.Provider value={{
            transactions,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            totalBalance,
            totalIncome,
            totalExpenses
        }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
}
