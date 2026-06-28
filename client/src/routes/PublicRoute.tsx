"use client"

import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function PublicRoutes({ children }: { children: ReactNode }) {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) router.replace("/problems");
    }, [loading, user]);
    if (loading) return (<div>LOADING...</div>);
    if (user) return null;
    return children;
}