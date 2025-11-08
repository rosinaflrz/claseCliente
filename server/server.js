const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.get('/health', (req, res) => res.json({ status: 'ok' }));

io.on('connection', (socket) => {
  socket.on('user_connected', (username) => {
    socket.broadcast.emit('user_connected', username);
  });
  socket.on('message', (payload) => {
    io.emit('message', payload);
  });
});
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
