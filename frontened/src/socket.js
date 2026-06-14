import { io } from "socket.io-client";

const socket = io("https://chat-application-production.up.railway.app");
export default socket;