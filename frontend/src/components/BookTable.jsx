import React, { useEffect } from "react";
import { useBookContext } from "../context/BookContext";
import BookOptions from "./BookOptions";
import Spinner from "./Spinner";

const BookTable = () => {
  const { books, fetchData, isLoading } = useBookContext();
  useEffect(() => {
    fetchData();
    console.log("Call BookTable");
  }, []);
  return (
    <>
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
            {books?.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center text-sm md:text-sm--line-height">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center text-sm md:text-sm--line-height">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center text-sm--line-height max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center text-sm--line-height max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center text-sm md:text-sm--line-height">
                  <BookOptions bookId={book._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookTable;
