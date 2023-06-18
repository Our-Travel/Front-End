import React from 'react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');
const ChatTest = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };
  const sendButton = () => {
    socket.emit('send_message', { message, room });
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input placeholder="RoomNumber" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>joinRoom</button>
      <div>
        <input
          placeholder="input"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendButton}>전송 버튼</button>
      </div>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
};

export default ChatTest;
