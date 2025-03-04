import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <div className="flex justify-center gap-4">

            {/* Previous Button */}
            {currentPage > 1 && (
                <button
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer px-4 py-2 bg-sky-600 rounded hover:bg-sky-800 text-white"
                >
                Previous
                </button>
            )}


            {/* Next Button */}
            {currentPage < totalPages && (
                <button
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer px-4 py-2 bg-sky-600 rounded hover:bg-sky-800 text-white"
                >
                Next
                </button>
            )}
        </div>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
