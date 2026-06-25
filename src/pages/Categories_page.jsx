import { useState } from "react";
import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryPagination from "../components/categories/CategoryPagination";
import { useCategories } from "../hooks/useCategory";

function Categories_page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { categories = [] } = useCategories();

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((category) =>
      statusFilter === "All"
        ? true
        : category.status === statusFilter
    );

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <CategoryHeader
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryTable categories={paginatedCategories} />

      <CategoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalCategories={filteredCategories.length}
      />
    </div>
  );
}

export default Categories_page;