import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Transaction, 'id'>) => void;
    initialData?: Transaction;
    title: string;
}

export function TransactionModal({ isOpen, onClose, onSubmit, initialData, title }: TransactionModalProps) {
    const { user } = useAuth();

    // Initialize state with userId to satisfy Omit<Transaction, 'id'>
    const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
        userId: user?.id || '',
        title: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    userId: initialData.userId,
                    title: initialData.title,
                    amount: initialData.amount,
                    category: initialData.category,
                    date: initialData.date,
                    type: initialData.type
                });
            } else {
                setFormData({
                    userId: user?.id || '',
                    title: '',
                    amount: 0,
                    category: '',
                    date: new Date().toISOString().split('T')[0],
                    type: 'expense'
                });
            }
        }
    }, [initialData, isOpen, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-[#1e293b]/90 backdrop-blur-2xl rounded-[32px] sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl w-full max-w-lg overflow-hidden relative z-[101] transition-colors duration-300 flex flex-col max-h-[90vh] sm:max-h-none"
                    >
                        <div className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
                            <h3 className="font-black text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 md:p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-6 overflow-y-auto">
                            <div className="flex p-1 md:p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                                {(['income', 'expense'] as TransactionType[]).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={cn(
                                            "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative uppercase tracking-widest",
                                            formData.type === type
                                                ? "text-white shadow-lg"
                                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        )}
                                        onClick={() => setFormData({ ...formData, type })}
                                    >
                                        {formData.type === type && (
                                            <motion.div
                                                layoutId="modalTypeBg"
                                                className={cn("absolute inset-0 rounded-xl", type === 'income' ? 'bg-emerald-600' : 'bg-rose-600')}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{type}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-1">Description</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-bold text-sm md:text-base"
                                    placeholder="e.g. AWS Cloud Services"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-1">Value (INR)</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 pl-10 pr-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-black text-lg md:text-xl"
                                            placeholder="0.00"
                                            value={formData.amount || ''}
                                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-1">Timeline</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-bold text-sm md:text-base"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pb-4">
                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-1">Context / Category</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-bold text-sm md:text-base"
                                    placeholder="e.g. Infrastructure"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] text-base md:text-lg uppercase tracking-widest"
                            >
                                {initialData ? 'Update Ledger' : 'Commit to Ledger'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
