import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useBookContext } from '../context/BookContext'
import BookForm from '../components/BookForm'

const BookEditor = () => {
  const { id } = useParams()
  const { books } = useBookContext()
  const [book] = books.filter(book => book._id === id)

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmitBook = async (data) => {
    setIsLoading(true)
    try {
      if (book) {
        const res = await axios.put(`/books/${book._id}`, data, { withCredentials: true })
        toast.success(res.data?.message || 'Book updated!')
      } else {
        const res = await axios.post('/books', data, { withCredentials: true })
        toast.success(res.data?.message || 'Book created!')
      }
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create/edit the book')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>{book ? "Update Book" : "Create Book"}</h1>
      {isLoading && <Spinner />}
      <BookForm 
        initialData={book} 
        onSubmit={handleSubmitBook} 
        isLoading={isLoading}
      />
    </div>  
  )
}

export default BookEditor
