import app from './app';
import socketIo from 'socket.io';
import http from 'http';

const PORT = 8080

const server = http.createServer(app);

server.listen(PORT, () => console.log('Listening request'));

export const io = socketIo(server);
