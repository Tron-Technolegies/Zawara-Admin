import { useState } from "react";
import CategoryHeader from "../components/categories/CategoryHeader"
import CategoryTable from "../components/categories/CategoryTable"
import CategoryPagination from "../components/categories/CategoryPagination";

function Categories_page() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showModal, setShowModal] =
    useState(false);

  const categories = [
    {
      id: 1,
      image: "/categories/casual.jpg",
      name: "Casual Wear",
      slug: "casual-wear",
      status: "Active",
      createdDate: "2026-06-01",
    },
    {
      id: 2,
      image: "/categories/party.jpg",
      name: "Party Wear",
      slug: "party-wear",
      status: "Active",
      createdDate: "2026-06-02",
    },
  ];

  return (
    <div className="p-6">

      <CategoryHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setShowModal={setShowModal}
      />

      <CategoryTable
        categories={categories}
      />

      <CategoryPagination
        currentPage={currentPage}
        totalPages={5}
        setCurrentPage={setCurrentPage}
        totalCategories={
          categories.length
        }
      />

    </div>
  );
}

export default Categories_page;