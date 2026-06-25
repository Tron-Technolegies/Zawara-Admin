function CategoryPagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalCategories,
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
      <p className="text-sm text-gray-500">
        Total Categories: {totalCategories}
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(totalPages || 0)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-10 h-10 rounded-full ${currentPage === index + 1
              ? "bg-[#FFA100] text-white"
              : "hover:bg-gray-100"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default CategoryPagination;