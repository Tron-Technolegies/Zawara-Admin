import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerPagination from "../components/customers/CustomerPagination";

function CustomersPage() {
  const { customers, loading } = useCustomers();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      String(value)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <CustomerHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CustomerTable customers={currentCustomers} />

      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default CustomersPage;