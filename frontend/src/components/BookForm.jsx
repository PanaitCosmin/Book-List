import React, { useState } from "react";

const BookForm = ({ initialData, onSubmit, isLoading }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [publishYear, setPublishYear] = useState(
    initialData?.publishYear || ""
  );
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!publishYear || publishYear < 0)
      newErrors.publishYear = "Publish year must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    onSubmit({ title, author, publishYear });
  };

  return (
    <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
      {/* Title Input */}
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
            errors.title
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Author Input */}
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
            errors.author
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
          }`}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      {/* Publish Year Input */}
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
        <input
          type="number"
          min="0"
          value={publishYear}
          onChange={(e) => setPublishYear(parseInt(e.target.value) || "")}
          onFocus={(e) => e.target.select()}
          className={`border-2 px-4 py-2 w-full rounded-md focus:outline-none ${
            errors.publishYear
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
          }`}
        />
        {errors.publishYear && (
          <p className="text-red-500 text-sm mt-1">{errors.publishYear}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="cursor-pointer p-2 bg-sky-300 m-8"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default BookForm;
