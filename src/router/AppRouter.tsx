import { Navigate, Route, Routes } from "react-router-dom";

import  LoginPage  from "../pages/LoginPage";
import  RegisterPage  from "../pages/RegisterPage";
import  AnimePage  from "../pages/AnimePage";
import  FavoritesPage  from "../pages/FavoritesPage";
import  HistoryPage  from "../pages/HistoryPage";
import  MainLayout  from "../layouts/Mainlayout";
import  PrivateRoute  from "./PrivateRoute";



function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/animes"
                element={
                    <MainLayout>
                        <AnimePage />
                    </MainLayout>
                }
            />
 
            <Route
                path="/favorites"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <FavoritesPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
 
            <Route
                path="/history"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <HistoryPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
 
            <Route path="*" element={<Navigate to="/animes" replace />} />
        </Routes>
    );
}

export default AppRouter;