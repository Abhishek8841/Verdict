import ProtectedRoutes from "@/src/routes/ProtectedRoute";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoutes>
            {children}
        </ProtectedRoutes>
    );
}
