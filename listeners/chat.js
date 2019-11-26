

module.exports = (socket, io) => {
    socket.on('join', (data) => {
        socket.join(data);
        io.emit('message', 'New user joined the room!')
    });

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'user disconnected');
    });

};
