import {
  FiHome,
  FiBox,
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiLogOut,
  FiX,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("login/")
  }
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      title: "Products",
      icon: <FiBox />,
      path: "/product",
    },
    {
      title: "Categories",
      icon: <FiGrid />,
      path: "/categories",
    },
    {
      title: "Orders",
      icon: <FiShoppingBag />,
      path: "/orders",
    },
    {
      title: "Sales",
      icon: <FiDollarSign />,
      path: "/saleshistory",
    },
    {
      title: "Customers",
      icon: <FiUsers />,
      path: "/customers",
    },
    {
      title: "Coupons",
      icon: <FiFileText />,
      path: "/coupons",
    },
  ];
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
    fixed lg:relative
    top-0 left-0 z-50
    w-72 h-screen
    bg-[#1C1917]
    flex flex-col
    border-r border-gray-800
    overflow-hidden
    transform transition-all duration-300
    ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
  `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
          <img
            src="/Zawara-logo.png"
            alt="Zawara"
            className="ml-8 h-8 object-contain invert "
          />

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-[#FFA100]"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="
    flex-1
    overflow-y-auto
    px-4 py-6
    space-y-2
  "
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                  flex items-center gap-4
                  px-4 py-3
                  rounded-xl
                  transition-all duration-200
                  font-medium

                  ${isActive
                  ? "bg-[#FFA100] text-black shadow-lg"
                  : "text-gray-300 hover:bg-[#2A2624] hover:text-white"
                }
                `
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-800 p-4">
          <button
            className="
              flex items-center gap-3
              w-full
              px-4 py-3
              rounded-xl
              text-red-400
              hover:bg-red-500/10
              hover:text-red-300
              transition-all duration-200
            "

            onClick={handleLogout}
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;