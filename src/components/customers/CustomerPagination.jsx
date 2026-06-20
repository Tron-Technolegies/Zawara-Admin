function CustomerPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-end mt-6">

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="w-10 h-10 rounded-full hover:bg-gray-100"
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
          className="w-10 h-10 rounded-full hover:bg-gray-100"
        >
          ›
        </button>

      </div>

    </div>
  );
}

export default CustomerPagination;