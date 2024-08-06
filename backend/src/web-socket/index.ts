import { WebSocketServer } from "ws";
import { Server } from "http";

let webSocketServer: WebSocketServer;

const initializeWebSocket = (server: Server) => {
  webSocketServer = new WebSocketServer({ server });

  webSocketServer.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message: string) => {
      console.log("Received:", message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
};

export const broadcast = (data: any) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

export default initializeWebSocket;
