const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Game = require('./gameLogic'); // Import your game logic

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Initialize the game
const game = new Game();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Add player to the game
    game.addPlayer(socket.id);

    socket.on('update score', (points) => {
        game.updateScore(socket.id, points);
        io.emit('score update', game.getScores());
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        game.removePlayer(socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
