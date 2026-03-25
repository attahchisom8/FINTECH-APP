import { Socket, Server } from "socket.io";

export default function handleSocketConnection(io: Server) {
	io.on("connection", (socket: Socket) => {
		console.log("User connected: ", socket.id);

		socket.on("join-room", (userId: string) => {
      socket.join(userId);
			console.log(`User ${ userId } joined the room`);
		});
		
		socket.on("disconnect", (socket: any) => {
			console.log("User disconnected", socket.id);
		});
	});
};
