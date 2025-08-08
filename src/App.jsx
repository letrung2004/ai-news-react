import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/reader/HomePage'
import Layout from './layouts/reader/Layout'
import ArticlePage from './pages/reader/ArticlePage'
import ListArticle from './pages/reader/ListArticle'
import AdminLayout from './layouts/manager/AdminLayout'
import AdminHome from './pages/manager/AdminHome'
import Login from './pages/auth/Login'
import Unauthorized from './pages/auth/Unauthorized'
import Register from './pages/auth/Register'
import AddArticle from './pages/manager/AddArticle'
import SystemLogin from './pages/auth/SystemLogin'
import AuthProvider from './contexts/AuthProvider'
import Authenticate from './pages/auth/Authenticate'
import AddCategory from './pages/manager/AddCategory'
import AddTag from './pages/manager/AddTag'
import AllArticles from './pages/manager/AllArticles'
import AdminRoute from './components/AdminRoute'
import SuperAdminRoute from './components/SuperAdminRoute'
import ErrorBoundary from './components/ErrorBoundary'


function App() {

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
            <Route path="/unauthorized" element={<Unauthorized />} />


            {/* Reader route */}
            <Route path="/" element={<Layout />} >
              <Route index element={<HomePage />} />
              <Route path="/detail/:articleSlug" element={<ArticlePage />} />
              <Route path="/category/:categorySlug" element={<ListArticle />} />
            </Route>

            {/* Admin route */}
            <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />} >
              <Route index element={<AdminHome />} />
              <Route path="/admin/articles/new" element={
                <ErrorBoundary>
                  <AddArticle />
                </ErrorBoundary>
              } />
              <Route path="/admin/categories" element={<AddCategory />} />
              <Route path="/admin/tags" element={<AddTag />} />
              <Route path="/admin/articles" element={<AllArticles />} />
              <Route path="/admin/users" element={<SuperAdminRoute element={<AllArticles />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
