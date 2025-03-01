import axios from "axios"
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import BookEditor from './pages/BookEditor'
import { Toaster } from 'react-hot-toast'
import { BookProvider } from "./context/BookContext"

// Backend API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
axios.defaults.baseURL = API_BASE_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <BookProvider>
    <Toaster position='top-center' toastOptions={{duration: 4000}}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<BookEditor />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<BookEditor />} />
    </Routes>
    </BookProvider>
  )
}

export default App
