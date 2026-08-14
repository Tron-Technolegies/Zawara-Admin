import { FiBell, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Navbar({ setSidebarOpen }) {
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/product": "Products",
    "/categories": "Categories",
    "/users": "Users",
    "/orders": "Orders",
    "/customers": "Customers",
    "/coupons": "Coupons",
  };

  const title = pageTitles[location.pathname] || "Admin Panel";

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/notifications/");
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unread_count || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // WebSocket live notification
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/admin/notifications/");

    socket.onopen = () => {
      console.log("Notification socket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const newNotification = {
        id: data.notification_id,
        title: data.title,
        message: data.message,
        created_at: data.created_at,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount(data.unread_count);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Notification socket disconnected");
    };

    return () => socket.close();
  }, []);

  // Delete single notification after reading
  const handleNotificationClick = async (notificationId) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/admin/notifications/read/${notificationId}/`
      );

      setNotifications((prev) =>
        prev.filter((item) => item.id !== notificationId)
      );

      setUnreadCount(res.data.unread_count);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Delete all notifications
  const handleMarkAllRead = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/notifications/read-all/"
      );

      setNotifications([]);
      setUnreadCount(res.data.unread_count);
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  };

  return (
    <header className="h-[81px] w-full bg-[#F9F8F6] sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <FiMenu className="text-2xl text-gray-700" />
          </button>

          <h1 className="text-xl md:text-2xl font-semibold text-black">
            {title}
          </h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiBell className="text-[22px] text-gray-700" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center rounded-full">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-[360px] max-h-[420px] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>

                {notifications.length > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-50 bg-red-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDate(notification.created_at)}
                        </p>
                      </div>

                      <span className="mt-1 w-2.5 h-2.5 bg-red-500 rounded-full shrink-0"></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;