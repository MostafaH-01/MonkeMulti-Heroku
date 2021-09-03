import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from "socket.io-client";
import React, { useEffect } from 'react';

export default function LobbyRoom() {
    let messages, input;
    
    const socket = io();

    socket.on('connection');

    useEffect(() => {
        socket.on('join room', (msg) => {
            console.log('message : ' + msg + ' from : ' + socket.id);   
            var item = document.createElement('li');
            item.textContent = msg;
            messages = document.getElementById('messages');
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
    socket.on("connect_error", (err) => {
        console.log('connect_error due to ' + err.message);
    });
    console.log('check 1', socket.connected);
    // socket.on('connection', function() {
    //     console.log('check 2', socket.connected);
    // });

    //var socket = io (SERVER);
    async function SendMessage(e){ 
        e.preventDefault();
        messages = document.getElementById('messages');
        input = document.getElementById('input');

        if (input.value) {
            socket.emit('join room', input.value);
            input.value = '';
        }
    }
    return(
        <div>
            <ul id="messages"></ul>
            <form id="form" onSubmit={SendMessage}>
                <input id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    );
}