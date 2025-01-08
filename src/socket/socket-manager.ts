import { io, Socket } from "socket.io-client";

export default class SocketManager {
  private static instance: SocketManager | null = null;
  private socket: Socket;

  private constructor(url: string) {
    this.socket = io(url);
  }

  public static getInstance(url: string): SocketManager {
    if (!this.instance) {
      this.instance = new SocketManager(url);
    }
    return this.instance;
  }

  public subscribe(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  public unsubscribe(event: string, callback: (data: any) => void) {
    this.socket.off(event, callback);
  }

  public send(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
