import { useEffect, useState } from "react";
import { useBookContext } from "../context/BookContext";
import Spinner from "./Spinner";
import BookOptions from "./BookOptions";
import Pagination from "./Pagination";

const BookTable = () => {
  const { books, fetchData, isLoading } = useBookContext();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 7;
  
  // Calculate the books for the current page
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="h-[450px]">
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
                {currentBooks?.map((book, index) => (
                  <tr key={book._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center text-sm md:text-sm--line-height">
                      {startIndex + index + 1}
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
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalItems={books.length}
            itemsPerPage={booksPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default BookTable;
