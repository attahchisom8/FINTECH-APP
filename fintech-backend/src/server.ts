import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import handleSocketConnection from "./lib/handleSocketConnection";
import cors from "cors";

dotenv.config();

const PORT = 5000;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*/*",
	}
});
handleSocketConnection(io);

// use server to listen instead of app
server.listen(PORT, () => {
	console.log(`server running on port: ${PORT}`);
});
