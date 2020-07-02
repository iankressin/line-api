import socketIo from 'socket.io';
import { Server } from 'http';

class Socket {
  public io: any;

  constructor(server: Server) {
    this.initializeSocket(server);
  }

  initializeSocket = (server: Server): void => {
    this.io = socketIo(server);
  }
}

export default Socket;
