import { LayoutDashboard, Receipt, PiggyBank, Settings, LogOut, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Receipt, label: 'Transactions', href: '/transactions' },
    { icon: PiggyBank, label: 'Budget', href: '/budget' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

interface SidebarProps {
    currentPath: string;
    onNavigate: (path: string) => void;
    isOpen?: boolean;
    onClose?: boolean | (() => void);
}

export function Sidebar({ currentPath, onNavigate, isOpen, onClose }: SidebarProps) {
    const { user, logout } = useAuth();
    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => typeof onClose === 'function' && onClose()}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={cn(
                "fixed inset-y-0 left-0 w-72 bg-[var(--bg-sidebar)] border-r border-slate-200 dark:border-white/5 flex flex-col h-full z-50 overflow-hidden transition-all duration-300 lg:relative lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Abstract Background Elements */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="p-8 relative z-10">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 mesh-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-black text-2xl">{(user?.email.charAt(0) || 'M').toUpperCase()}</span>
                            </div>
                            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Money<span className="text-blue-500">Manager</span></span>
                        </div>
                        <button
                            onClick={() => typeof onClose === 'function' && onClose()}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = currentPath === item.href;
                            return (
                                <button
                                    key={item.href}
                                    onClick={() => onNavigate(item.href)}
                                    className={cn(
                                        "relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden",
                                        isActive
                                            ? "text-blue-600 dark:text-white"
                                            : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30 rounded-xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    <item.icon className={cn(
                                        "w-5 h-5 transition-transform duration-300 group-hover:scale-110 relative z-10",
                                        isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-slate-300"
                                    )} />
                                    <span className="font-bold relative z-10 uppercase tracking-wider text-[11px]">{item.label}</span>

                                    {isActive && (
                                        <motion.div
                                            className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                                            layoutId="activeIndicator"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 relative z-10 border-t border-slate-200 dark:border-white/5">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300 group"
                    >
                        <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-rose-600 dark:group-hover:text-rose-400" />
                        <span className="font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
