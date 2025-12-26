import { Card } from '../components/Card';
import { PiggyBank, Plus, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function Budget() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Capital <span className="text-blue-500">Shield</span></h1>
                    <p className="text-slate-400 font-medium mt-1">Configure spending boundaries and efficiency targets</p>
                </div>
                <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold tracking-wide">Set Boundary</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="flex flex-col items-center justify-center p-16 bg-white/[0.02] border-dashed border-white/10">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 bg-blue-500/10 rounded-3xl shadow-inner flex items-center justify-center mb-6 ring-8 ring-blue-500/5"
                    >
                        <PiggyBank className="w-12 h-12 text-blue-400" />
                    </motion.div>
                    <p className="text-2xl font-black text-white">No active shields</p>
                    <p className="text-slate-500 font-medium text-center mt-3 max-w-[250px]">
                        Initialize spending limits for specific operational categories to maintain fiscal health.
                    </p>
                    <button className="mt-8 text-blue-400 font-black hover:text-blue-300 transition-colors uppercase tracking-[0.2em] text-xs">
                        Initialize First Shield
                    </button>
                </Card>

                {/* Placeholder for future active budgets */}
                {[1, 2].map(i => (
                    <Card key={i} className="opacity-40 grayscale pointer-events-none">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="h-4 w-24 bg-white/10 rounded-full mb-2" />
                                <div className="h-3 w-16 bg-white/5 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                            <div className="flex justify-between">
                                <div className="h-3 w-12 bg-white/5 rounded-full" />
                                <div className="h-3 w-12 bg-white/5 rounded-full" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
