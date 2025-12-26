import { cn } from '../lib/utils';
import { ShoppingBag, Home, Car, Utensils, Zap, ShoppingCart, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { Transaction } from '../types';

const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('food') || cat.includes('eat')) return Utensils;
    if (cat.includes('shop')) return ShoppingBag;
    if (cat.includes('rent') || cat.includes('home')) return Home;
    if (cat.includes('car') || cat.includes('travel')) return Car;
    if (cat.includes('bill') || cat.includes('zap')) return Zap;
    return ShoppingCart;
};

interface RecentTransactionsListProps {
    transactions: Transaction[];
}

export function RecentTransactionsList({ transactions }: RecentTransactionsListProps) {
    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm font-bold tracking-wide uppercase opacity-50">No Activity Yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx) => {
                const Icon = getCategoryIcon(tx.category);
                const isIncome = tx.type === 'income';
                return (
                    <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-white/[0.03] rounded-2xl transition-all duration-300 group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110",
                                isIncome ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tx.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{tx.category}</span>
                                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-600">{new Date(tx.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-lg",
                                isIncome ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            )}>
                                {isIncome ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                            </div>
                            <span className={cn(
                                "font-black text-lg tracking-tight",
                                isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                            )}>
                                {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString()}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
