import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-system" element={<SystemLogin />} />



          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="/aaaa" element={<ArticlePage />} />
            <Route path="/bbbb" element={<ListArticle />} />
          </Route>


          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<AdminHome />} />
            <Route path="/admin/add" element={<AddArticle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
