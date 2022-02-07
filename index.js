const app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

let userArr = [];

io.on('connection', (socket) => {
  // console.log('connect');
  userArr.push({
    userID: socket.id,
    // color: CSS_COLOR_NAMES[getRndInteger(0, CSS_COLOR_NAMES.length)],
    // hue: getRndInteger(0, 360),
    xPos: 0,
    yPos: 0,
  });
  console.log(`a user with the id ${socket.id} connected. users online: ${userArr.length}`);

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('mouse move', (mousePos) => {

    // for(let i=0; i<userArr.length; i++) {
    //   if(userArr[i].userID === socket.id) {
    //     userArr[i].xPos = mousePos.x;
    //     userArr[i].yPos = mousePos.y;
    //     console.log(userArr[i].xPos);
    //   }
    // }

    // io.emit('updateCursorPos', userArr);
    io.emit('updateCursorPos', {session_id: socket.id, coords: mousePos});

    // io.emit('updateCursorPos', userArr);
    // io.emit('check distances', userArr);
  })


  // socket.on('mouse',
  //     function(data) {
  //       // Data comes in as whatever was sent, including objects
  //       console.log("Received: 'mouse' " + data.x + " " + data.y);
  //
  //       // Send it to all other clients
  //       socket.broadcast.emit('mouse', data);
  //       //total_eggs++;
  //
  //     }
  //   );
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
