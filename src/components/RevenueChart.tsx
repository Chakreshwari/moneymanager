import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types';
import { useTheme } from '../context/ThemeContext';

interface RevenueChartProps {
    transactions: Transaction[];
}

export function RevenueChart({ transactions }: RevenueChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Aggregate data by month
    const monthlyData = transactions.reduce((acc: any[], tx) => {
        const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
        const existing = acc.find(d => d.name === month);

        if (existing) {
            if (tx.type === 'income') existing.income += tx.amount;
            else existing.expense += tx.amount;
        } else {
            acc.push({
                name: month,
                income: tx.type === 'income' ? tx.amount : 0,
                expense: tx.type === 'expense' ? tx.amount : 0
            });
        }
        return acc;
    }, []);

    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sortedData = monthlyData.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

    if (transactions.length === 0) {
        return (
            <div className="h-[350px] w-full flex items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                <p className="font-bold uppercase tracking-widest text-xs opacity-50">Operational Data Required</p>
            </div>
        );
    }

    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={sortedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: textColor, fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: textColor, fontSize: 10, fontWeight: 700 }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            color: isDark ? '#f1f5f9' : '#0f172a'
                        }}
                    />
                    <Area type="monotone" dataKey="income" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={4} />
                    <Area type="monotone" dataKey="expense" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={4} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
