import React, { useEffect, useState } from "react";
import { connectNotificationSocket } from "../services/notificationSocket";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        connectNotificationSocket((data) => {
            console.log("New notification:", data);

            setNotifications((prev) => [data, ...prev]);
            setUnreadCount(data.unread_count);
        });
    }, []);

    return (
        <div style={{ position: "relative", cursor: "pointer" }}>

            {/* Bell Icon */}
            <span style={{ fontSize: "22px" }}>🔔</span>

            {/* Red badge */}
            {unreadCount > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "12px",
                        padding: "2px 6px",
                    }}
                >
                    {unreadCount}
                </span>
            )}

        </div>
    );
};

export default NotificationBell;