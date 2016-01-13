import http from 'http';
import socketIO from 'socket.io';

export default class SocketServer {
  constructor(port = 3000) {
    this.port = port;
  }
  
  start() {
    this.server = http.createServer();
    this.io = socketIO(this.server);
    this.io.on('connection', this.setupConnection);
    this.server.listen(this.port);
    console.log(`Listening on port ${this.port}`)
  }
  
  setupConnection(socket) {
    socket.emit('Welcome');
  }
}