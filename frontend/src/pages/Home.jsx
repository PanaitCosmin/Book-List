import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { SquarePlus, Info, Pencil, Trash2 } from "lucide-react";
import { toast } from 'react-hot-toast'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/books", { withCredentials: true });
        setBooks(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch books')
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book? This action is irreversible.')) {
      return
    }

    try {
      const res = await axios.delete(`/books/${id}`, {withCredentials: true})
      toast.success(res.data?.message || 'Book deleted!')

      setBooks(prev => prev.filter(book => book._id !== id))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete the book')
      console.log(error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>

        <Link to="/books/create">
          <SquarePlus className="text-sky-800 text-4xl" size={32}/>
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <Info className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`} state={book}>
                      <Pencil className="text-2xl text-yellow-600" />
                    </Link>
                    <Link>
                      <Trash2 className="text-2xl text-red-600" onClick={() => handleDelete(book._id)}/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
