"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { UserType } from "../types/user.types";
import { me } from "../services/auth.services";

type AuthContextType = {
    loading: boolean,
    user: UserType | null,
    setUser: Dispatch<SetStateAction<UserType | null>>,
    fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    async function fetchUser() {
        try {
            setLoading(true);
            console.log("in fetchuser")
            const result = await me();
            setUser(result.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchUser() }, []);
    const value = { loading, user, setUser, fetchUser };

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}