"use client"
import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace("/login");
    }, [loading, user]);

    // this corrects the page after loading/render/paint as useEffect runs after paint so maybe ui flash before redirect !!!
    
    if (loading) return (<div>LOADING...</div>);
    if (!user) return null;
    console.log(user);
    return children;
}