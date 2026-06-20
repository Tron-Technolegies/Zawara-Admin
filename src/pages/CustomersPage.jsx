import { useState } from "react";
import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerPagination from "../components/customers/CustomerPagination";


function CustomersPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

 

  const [currentPage, setCurrentPage] =
    useState(1);

  const customers = [
    {
      id: 1,
      name: "Ananya Nair",
      email: "ananya@gmail.com",
      phone: "+91 9876543210",
      orders: 12,
      totalSpent: "54,500",
      status: "Active",
    },
    {
      id: 2,
      name: "Meera Das",
      email: "meera@gmail.com",
      phone: "+91 9876543211",
      orders: 5,
      totalSpent: "18,000",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-6">

      <CustomerHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CustomerTable
        customers={customers}
      />

      <CustomerPagination
        currentPage={currentPage}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />


    </div>
  );
}

export default CustomersPage;