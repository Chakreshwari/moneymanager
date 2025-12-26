import { cn } from '../lib/utils';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    title?: string;
    className?: string;
    children: ReactNode;
    action?: ReactNode;
    delay?: number;
}

export function Card({ title, className, children, action, delay = 0 }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={cn("glass-card rounded-3xl overflow-hidden shadow-sm dark:shadow-none", className)}
        >
            {(title || action) && (
                <div className="px-8 py-5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
                    {title && <h3 className="text-lg font-bold text-slate-800 dark:text-white/90 tracking-tight">{title}</h3>}
                    {action}
                </div>
            )}
            <div className="p-8">
                {children}
            </div>
        </motion.div>
    );
}
