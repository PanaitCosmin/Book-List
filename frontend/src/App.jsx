import axios from "axios"
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import { Toaster } from 'react-hot-toast'

// Backend API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
axios.defaults.baseURL = API_BASE_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 4000}}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
    </Routes>
    </>
  )
}

export default App
