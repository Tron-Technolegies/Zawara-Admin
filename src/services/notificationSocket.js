let socket = null;

export const connectNotificationSocket = (onMessage) => {
    socket = new WebSocket("ws://127.0.0.1:8000/ws/admin/notifications/");

    socket.onopen = () => {
        console.log("Notification socket connected");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onerror = (error) => {
        console.error("Notification socket error:", error);
    };

    socket.onclose = () => {
        console.log("Notification socket disconnected");
    };

    return () => {
        if (socket) {
            socket.close();
        }
    };
};