// import { useState } from "react";
// import CustomerHeader from "../components/customers/CustomerHeader";
// import CustomerTable from "../components/customers/CustomerTable";
// import CustomerPagination from "../components/customers/CustomerPagination";


// function CustomersPage() {
//   const [searchTerm, setSearchTerm] =
//     useState("");

//   const [statusFilter, setStatusFilter] =
//     useState("All");



//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const filteredCustomers = customers.filter((customer) =>
//     Object.values(customer).some((value) =>
//       String(value)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <div className="space-y-6">

//       <CustomerHeader
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />

//       <CustomerTable
//         customers={filteredCustomers}
//       />

//       <CustomerPagination
//         currentPage={currentPage}
//         totalPages={5}
//         setCurrentPage={setCurrentPage}
//       />


//     </div>
//   );
// }

// export default CustomersPage;

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

      <CustomerTable customers={filteredCustomers} />

      <CustomerPagination
        currentPage={currentPage}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default CustomersPage;

