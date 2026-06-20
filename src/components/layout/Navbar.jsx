import { FiBell, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function Navbar({ setSidebarOpen }) {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/product": "Products",
    "/categories": "Categories",
    "/users": "Users",
    "/orders": "Orders",
    "/customers": "Customers"
  };

  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="h-[81px] w-full bg-[#F9F8F6] sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-6 md:px-8">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Hamburger - Mobile Only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <FiMenu className="text-2xl text-gray-700" />
          </button>

          <h1 className="text-xl md:text-2xl font-semibold text-black">
            {title}
          </h1>

        </div>

        {/* Right Section */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <FiBell className="text-[22px] text-gray-700" />

          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;