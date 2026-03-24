import { Socket, Server } from "socket.io";

export default function handleSocketConnection(io: Server) {
	io.on("connect", (socket: Socket) => {
		console.log("User connected: ", socket.id);

		io.on("join-room", (userId: string) => {
			console.log(`User ${ userId } joined the room`);
		});
		
		io.on("disconnect", (socket: any) => {
			console.log("User disconnected", socket.id);
		});
	});
};