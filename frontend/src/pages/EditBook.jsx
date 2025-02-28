import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const EditBook = () => {
  const book = useLocation().state

  const [title, setTitle] = useState(book?.title || '')
  const [author, setAuthor] = useState(book?.author || '')
  const [publishYear, setPublishYear] = useState(book?.publishYear || '')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateInputs = () => {
    let newErrors = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!author.trim()) newErrors.author = "Author is required"
    if (!publishYear || publishYear < 0) newErrors.publishYear = "Publish year must be a valid number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdateBook = async (e) => {
    e.preventDefault()

    if (!validateInputs()) return 

    const data = { title, author, publishYear }
    setIsLoading(true)

    try {
      const res = await axios.put(`/books/${book._id}`, data, { withCredentials: true })
      toast.success(res.data?.message || 'Book updated!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to edit the book')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Update Book</h1>
      {isLoading && <Spinner />}
      
      <div className='flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto'>
        {/* Title Input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
              errors.title ? 'border-red-500' : 'border-gray-500 focus:border-blue-500'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Author Input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
              errors.author ? 'border-red-500' : 'border-gray-500 focus:border-blue-500'
            }`}
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        {/* Publish Year Input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            min="0"
            value={publishYear}
            onChange={(e) => setPublishYear(parseInt(e.target.value) || '')}
            onFocus={(e) => e.target.select()}
            className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
              errors.publishYear ? 'border-red-500' : 'border-gray-500 focus:border-blue-500'
            }`}
          />
          {errors.publishYear && <p className="text-red-500 text-sm mt-1">{errors.publishYear}</p>}
        </div>

        {/* Submit Button */}
        <button 
          className='cursor-pointer p-2 bg-sky-300 m-8'
          onClick={handleUpdateBook}
        >
          Update
        </button>
      </div>
    </div>  
  )
}

export default EditBook
