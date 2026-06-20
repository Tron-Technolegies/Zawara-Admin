

function CategoryPagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalCategories,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

      <p className="text-sm text-gray-500">
        Total Categories: {totalCategories}
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(totalPages)].map(
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`w-10 h-10 rounded-full ${
                currentPage === index + 1
                  ? "bg-[#FFA100]"
                  : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          ›
        </button>

      </div>

    </div>
  );
}

export default CategoryPagination;