import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProductNewPage from "../pages/ProductNewPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/Mainlayout";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <DashboardPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
            <Route path="/products/new" element={
                    <PrivateRoute>
                        <MainLayout>
                            <ProductNewPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
            <Route path="/products/:id" element={
                    <PrivateRoute>
                        <MainLayout>
                            <ProductDetailPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;
