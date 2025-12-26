import { cn } from '../lib/utils';
import { ArrowDownLeft, Coffee, ShoppingBag, Home, Car } from 'lucide-react';

const recentTransactions = [
    { id: 1, title: 'Grocery Shopping', category: 'Food', amount: -120.50, date: 'Today, 10:30 AM', icon: ShoppingBag, type: 'expense' },
    { id: 2, title: 'Freelance Project', category: 'Income', amount: 850.00, date: 'Yesterday, 2:15 PM', icon: ArrowDownLeft, type: 'income' },
    { id: 3, title: 'Coffee Shop', category: 'Food', amount: -5.40, date: 'Yesterday, 9:00 AM', icon: Coffee, type: 'expense' },
    { id: 4, title: 'Rent Payment', category: 'Housing', amount: -1200.00, date: 'Oct 01, 2025', icon: Home, type: 'expense' },
    { id: 5, title: 'Uber Ride', category: 'Transport', amount: -24.00, date: 'Sep 29, 2025', icon: Car, type: 'expense' },
];

export function RecentTransactions() {
    return (
        <div className="space-y-4">
            {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            tx.type === 'income' ? "bg-emerald-100 text-emerald-600" : "bg-red-50 text-red-500"
                        )}>
                            <tx.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{tx.title}</h4>
                            <p className="text-xs text-gray-500">{tx.category} • {tx.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={cn(
                            "font-bold block",
                            tx.type === 'income' ? "text-emerald-600" : "text-gray-900"
                        )}>
                            {tx.type === 'income' ? '+' : ''}{tx.amount.toFixed(2)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
