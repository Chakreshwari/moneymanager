import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, _password: string) => {
        // Mock login
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
            const userData = { id: existingUser.id, email: existingUser.email };
            setUser(userData);
            localStorage.setItem('auth_user', JSON.stringify(userData));
        } else {
            throw new Error('Invalid email or password');
        }
    };

    const signup = async (email: string, _password: string) => {
        // Mock signup
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find((u: any) => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = { id: crypto.randomUUID(), email };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
