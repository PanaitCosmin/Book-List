import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const BookContext = createContext()

export const useBookContext = () => useContext(BookContext)

export const BookProvider = ({children}) => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/books", { withCredentials: true });
        setBooks(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch books");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
       
    return (
        <BookContext.Provider value={{ books, setBooks, fetchData, isLoading, setIsLoading }}>
            {children}
        </BookContext.Provider>
    )
}