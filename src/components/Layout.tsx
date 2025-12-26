import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
    currentPath: string;
    onNavigate: (path: string) => void;
}

export function Layout({ children, currentPath, onNavigate }: LayoutProps) {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const getPageTitle = () => {
        switch (currentPath) {
            case '/': return 'Analytics';
            case '/transactions': return 'Ledger';
            case '/budget': return 'Boundaries';
            case '/settings': return 'System Settings';
            default: return 'Finance Hub';
        }
    };

    return (
        <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-primary)] overflow-hidden font-sans transition-colors duration-300">
            <Sidebar
                currentPath={currentPath}
                onNavigate={(path) => {
                    onNavigate(path);
                    setIsSidebarOpen(false);
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Decorative Blurs - adaptive opacity */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

                <header className="h-24 bg-transparent flex items-center justify-between px-6 md:px-10 relative z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <motion.div
                            key={currentPath}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase truncate max-w-[150px] md:max-w-none">
                                {getPageTitle()}
                            </h2>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden sm:flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl border-2 border-white dark:border-[#0f172a] bg-slate-200 dark:bg-slate-800 shadow-sm" />
                            ))}
                        </div>
                        <div className="hidden sm:block h-10 w-[1px] bg-slate-200 dark:bg-white/10" />
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-[2px] shadow-lg shadow-blue-500/20">
                            <div className="w-full h-full rounded-[9px] md:rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-blue-600 dark:text-blue-400">
                                {(user?.email.charAt(0) || 'U').toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPath}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
