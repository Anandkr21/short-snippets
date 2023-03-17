const express = require('express');
const socketio = require('socket.io');
const http = require('http');


const app = express()

const server = http.createServer(app)
const io = socketio(server)
server.listen(9000, () => {
    console.log('running at 9000')
})


let data = {};
let infoarr = []
io.on('connection', (socket) =>{
    socket.emit("showscore", data)

    console.log('new')
    socket.on('updatescore', (score) =>{
        let runs = score.score;
        let wickets = score.wickets;
        let overs = score.overs;
        let con1 = score.con1;
        let con2 = score.con2;
        data = {con1:con1, con2:con2, runs:runs, wickets: wickets, overs:overs}

    })
    let interval = setInterval(() => {
        console.log("interval")
        socket.broadcast.emit('showmore', data)
    }, 1000*30);


    socket.on("extrainfo", (info) =>{
        infoarr[0]=info.batsman1;
        infoarr[1]=info.batsman2
        infoarr[2]=info.bowler
    })

    socket.on("showmoreinfo", (msg) =>{
        socket.emit('showextrainfotoall', {batsman1:infoarr[0],batsman2:infoarr[1], bowler:infoarr[2]})

    })

    socket.on('disconnect', () =>{
        console.log('clear')
        clearInterval(interval)
    })
})
