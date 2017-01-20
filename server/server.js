// Required Libraries and Frameworks
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Path() for easier files targeting
const publicPath = path.join(__dirname, '../public');

// Express Server
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

// SocketIO Events
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newEmail', {
		from: 'mike@example',
		text: 'Hey. What is going on.',
		createAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('disconnect', () => {
			console.log('User was disconnected');
		});
});
