import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/reader/HomePage'
import Layout from './layouts/reader/Layout'
import ArticlePage from './pages/reader/ArticlePage'
import ListArticle from './pages/reader/ListArticle'
import AdminLayout from './layouts/manager/AdminLayout'
import AdminHome from './pages/manager/AdminHome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AddArticle from './pages/manager/AddArticle'
import SystemLogin from './pages/auth/SystemLogin'
import AuthProvider from './contexts/AuthProvider'
import Authenticate from './pages/auth/Authenticate'
import { useAuth } from './hooks/useAuth'



function App() {
  const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
      if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/editor")) {
        return <Navigate to="/login-system" replace />;
      }
      return <Navigate to="/login" replace />;
    }

    return element;
  };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth route */}
            <Route path="/login" element={<Login />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-system" element={<SystemLogin />} />


            {/* Reader route */}
            <Route path="/" element={<Layout />} >
              <Route index element={<HomePage />} />
              <Route path="/detail/:articleSlug" element={<ArticlePage />} />
              <Route path="/category/:categorySlug" element={<ListArticle />} />
            </Route>

            {/* Admin route */}
            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<AdminHome />} />
              <Route path="/admin/add" element={<AddArticle />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
