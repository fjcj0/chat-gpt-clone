import { io } from "socket.io-client";
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
export const socket = io(serverUrl, {
    withCredentials: true,
});
socket.on('connect', () => {
    console.log('Socket connected to:', serverUrl);
});
socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
});
socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
});
socket.on('error', (error) => {
    console.error('Socket error:', error);
});