import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
    currentPath: string;
    onNavigate: (path: string) => void;
}

export function Layout({ children, currentPath, onNavigate }: LayoutProps) {
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
            <Sidebar currentPath={currentPath} onNavigate={onNavigate} />

            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Decorative Blurs - adaptive opacity */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

                <header className="h-24 bg-transparent flex items-center justify-between px-10 relative z-20">
                    <motion.div
                        key={currentPath}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                            {getPageTitle()}
                        </h2>
                    </motion.div>

                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-2xl border-2 border-white dark:border-[#0f172a] bg-slate-200 dark:bg-slate-800 shadow-sm" />
                            ))}
                        </div>
                        <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10" />
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-[2px] shadow-lg shadow-blue-500/20">
                            <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-blue-600 dark:text-blue-400">
                                U
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
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
