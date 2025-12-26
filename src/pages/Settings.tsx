import { Card } from '../components/Card';
import { User, Shield, Bell, Trash2, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export function Settings() {
    const { theme, toggleTheme } = useTheme();

    const handleClearData = () => {
        if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">System <span className="text-blue-500">Preferences</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 space-y-3">
                    <nav className="flex flex-col gap-2">
                        {[
                            { icon: User, label: 'Profile' },
                            { icon: Shield, label: 'Security' },
                            { icon: Bell, label: 'Notifications' },
                        ].map((item, i) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold group",
                                    i === 0
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </div>
                                <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", i === 0 ? "text-white/50" : "text-slate-400 dark:text-slate-600")} />
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="md:col-span-3 space-y-8">
                    <Card title="Visual Theme">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">Interface Mode</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select between Bright and Dark ecosystem</p>
                            </div>
                            <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                                <button
                                    onClick={() => theme !== 'light' && toggleTheme()}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold",
                                        theme === 'light'
                                            ? "bg-white text-blue-600 shadow-lg"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    <Sun className="w-4 h-4" />
                                    Bright
                                </button>
                                <button
                                    onClick={() => theme !== 'dark' && toggleTheme()}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold",
                                        theme === 'dark'
                                            ? "bg-white/10 text-blue-400 shadow-lg"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    <Moon className="w-4 h-4" />
                                    Dark
                                </button>
                            </div>
                        </div>
                    </Card>

                    <Card title="Account Profile">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="w-24 h-24 mesh-gradient rounded-[32px] flex items-center justify-center text-4xl font-black text-white shadow-2xl transition-transform group-hover:rotate-6">
                                    U
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 border-4 border-[#f8fafc] dark:border-[#0f172a] rounded-full" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white">Administrator</h4>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">system.admin@moneymanager.io</p>
                                <div className="flex gap-3 mt-4">
                                    <button className="px-5 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest transition-all">Edit Identity</button>
                                    <button className="px-5 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest transition-all">Update Avatar</button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Privacy & Terminal Zone" className="border-rose-500/20">
                        <div className="space-y-6">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Critical system operations. Actions performed here will irrevocably purge the local ledger and reset application state.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleClearData}
                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl hover:bg-rose-500/20 font-black transition-all border border-rose-500/20 uppercase tracking-widest text-sm"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Purge Local Ledger
                                </button>
                                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 font-black transition-all border border-slate-200 dark:border-white/5 uppercase tracking-widest text-sm">
                                    <LogOut className="w-5 h-5" />
                                    Terminate Session
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
