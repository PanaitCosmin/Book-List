import React from "react";
import { Info, Pencil, Trash2 } from "lucide-react";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const BookOptions = ({bookId}) => {
  const { setBooks } = useBookContext()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      const res = await axios.delete(`/books/${bookId}`, { withCredentials: true });
      toast.success(res.data?.message || "Book deleted!");

      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete the book");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center gap-x-4">
      <Link to={`/books/details/${bookId}`}>
        <Info className="text-2xl text-green-800" />
      </Link>
      <Link to={`/books/edit/${bookId}`}>
        <Pencil className="text-2xl text-yellow-600" />
      </Link>
      <Link>
        <Trash2
          className="text-2xl text-red-600"
          onClick={() => handleDelete(bookId)}
        />
      </Link>
    </div>
  );
};

export default BookOptions;
