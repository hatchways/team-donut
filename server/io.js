const express = require('express');
const chat = require('./listeners/chat');
const jwt = require('jwtwebtoken');
module.exports = function (io) {

    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
          jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
            if(err) return next(new Error('Authentication error'));
            socket.user = decoded;
            next();
          });
        } else {
            next(new Error('Authentication error'));
        }    
      })
 
    io.on('connection', (socket) => {
        chat(socket, io);
    });
}