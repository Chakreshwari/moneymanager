import { useState } from 'react';
import { Card } from '../components/Card';
import { Search, Filter, Plus, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTransactions } from '../context/TransactionContext';
import { TransactionModal } from '../components/TransactionModal';
import type { Transaction } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export function Transactions() {
    const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = transactions.filter(tx =>
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAddModal = () => {
        setEditingTransaction(undefined);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (tx: Transaction) => {
        setEditingTransaction(tx);
        setIsModalOpen(true);
    };

    const handleSubmit = (data: Omit<Transaction, 'id'>) => {
        if (editingTransaction) {
            updateTransaction({ ...data, id: editingTransaction.id });
        } else {
            addTransaction(data);
        }
    };

    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Ledger <span className="text-blue-500">Center</span></h1>
                    <p className="text-slate-400 font-medium mt-1">Detailed history of your financial ecosystem</p>
                </div>
                <button
                    onClick={handleOpenAddModal}
                    className="group relative flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex-shrink-0"
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <Plus className="w-5 h-5 relative z-10" />
                    <span className="font-bold tracking-wide relative z-10 text-lg">Post Transaction</span>
                </button>
            </div>

            <Card className="flex-1 flex flex-col p-0 min-h-[600px]">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 bg-white/[0.01]">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Query descriptions or categories..."
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-white placeholder-slate-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-slate-300 font-bold transition-all">
                        <Filter className="w-5 h-5" />
                        <span>Refine List</span>
                    </button>
                </div>

                <div className="flex-1 overflow-auto custom-scrollbar">
                    {filteredTransactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-32 text-slate-500">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 ring-8 ring-white/5">
                                <Search className="w-10 h-10 opacity-30" />
                            </div>
                            <p className="text-2xl font-black text-white/50">Zero Records Found</p>
                            <p className="text-base font-medium opacity-60 mt-2 text-center max-w-xs">Broaden your search criteria or log a new transaction to populate the ledger.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-[#161f31]">
                                <tr className="border-b border-slate-200 dark:border-white/5 shadow-sm">
                                    <th className="py-5 px-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em] w-[35%]">Entity</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Context</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Timeline</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right">Value</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right w-[150px]">Utility</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {filteredTransactions.map((tx, idx) => (
                                        <motion.tr
                                            key={tx.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-blue-500/[0.03] transition-all duration-300 group relative"
                                        >
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner transition-transform group-hover:scale-110",
                                                        tx.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                                    )}>
                                                        {tx.title.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{tx.title}</p>
                                                        <span className="text-[10px] text-slate-500 dark:text-slate-600 font-mono tracking-tighter opacity-70">ID: {tx.id.split('-')[0]}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full w-fit">
                                                    <Tag className="w-3 h-3 text-blue-500" />
                                                    {tx.category}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                    <Calendar className="w-4 h-4 opacity-50" />
                                                    {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className={cn(
                                                "py-6 px-8 text-right font-black text-2xl tracking-tighter",
                                                tx.type === 'income' ? "text-emerald-500 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                                            )}>
                                                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                    <button
                                                        onClick={() => handleOpenEditModal(tx)}
                                                        className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl border border-white/5 transition-all text-slate-400 shadow-xl"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteTransaction(tx.id)}
                                                        className="p-3 bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl border border-white/5 transition-all text-slate-400 shadow-xl"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingTransaction}
                title={editingTransaction ? "Verify Changes" : "Create Ledger Entry"}
            />
        </div>
    );
}
