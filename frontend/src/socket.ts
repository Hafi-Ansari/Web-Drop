import io from "socket.io-client";

// Initialize the socket connection
const socket = io(import.meta.env.VITE_SERVER_URL as string);

export default socket;
