function CustomerPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="mt-6 flex justify-center md:justify-end">
      <div className="overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max px-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40 shrink-0"
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full shrink-0 ${currentPage === index + 1
                ? "bg-[#FFA100] text-white"
                : "hover:bg-gray-100"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-40 shrink-0"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerPagination;