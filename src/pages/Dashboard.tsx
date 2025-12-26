import { Card } from '../components/Card';
import { RevenueChart } from '../components/RevenueChart';
import { RecentTransactionsList } from '../components/RecentTransactionsList';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function Dashboard() {
    const { totalBalance, totalIncome, totalExpenses, transactions } = useTransactions();

    const stats = [
        { label: 'Net Balance', value: totalBalance, icon: Wallet, color: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20' },
        { label: 'Total Income', value: totalIncome, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20' },
        { label: 'Monthly Expenses', value: totalExpenses, icon: TrendingDown, color: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20' },
        { label: 'Savings Rate', value: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0, isPercent: true, icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-purple-500/20' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat) => (
                    <motion.div key={stat.label} variants={item}>
                        <Card className="hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex items-center gap-5">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500", stat.bg, stat.glow)}>
                                    <stat.icon className={cn("w-7 h-7", stat.color)} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                                        {stat.isPercent ? `${Math.round(stat.value)}%` : `₹${stat.value.toLocaleString()}`}
                                    </h3>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title="Cash Flow Dynamics" className="lg:col-span-2 min-h-[450px]" delay={0.4}>
                    <div className="h-full pt-4">
                        <RevenueChart transactions={transactions} />
                    </div>
                </Card>
                <Card title="Recent Activity" className="min-h-[450px]" delay={0.5}>
                    <RecentTransactionsList transactions={transactions.slice(0, 6)} />
                </Card>
            </div>
        </div>
    );
}
