import PublicRoutes from "@/src/routes/PublicRoute";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PublicRoutes>
            {children}
        </PublicRoutes>
    )
}