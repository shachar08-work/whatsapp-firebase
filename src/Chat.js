import React, { useState, useEffect } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from "@mui/icons-material"
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import db from './firebase';
import { useStateValue } from './StateProvider';
import { serverTimestamp, addDoc } from 'firebase/firestore';

function Chat() {
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
      if (roomId) {
        onSnapshot(doc(db, 'rooms', roomId), (snapshot) => (
            setRoomName(snapshot.data().name)
        ));

        onSnapshot(query(collection(doc(db, 'rooms', roomId), 'messages'), orderBy('timestamp', 'asc')), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });
      }
    }, [roomId]);

  

    const sendMessage = async (event) => {
        event.preventDefault();

        await addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
        });
        setInput('');
    };

  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar />
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>Last seen{" "} {messages.length && messages[messages.length - 1].timestamp ? messages[messages.length - 1].timestamp.toDate().toUTCString() : "long time ago.."}</p>
            </div>
            <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            {messages.map(message => (
                (message.name === user.displayName) ?
                (
                    <p className='chat_reciever'>
                        <span className='chat_name'>{message.name}</span>
                            {message.message}
                        <span className='chat_timestamp'> {message.timestamp ? message.timestamp.toDate().toUTCString() : "Sending..."}</span>
                    </p>
                )
                :
                (
                    <p className='chat_message'>
                        <span className='chat_name'>{message.name}</span>
                            {message.message}
                        <span className='chat_timestamp'> {message.timestamp ? message.timestamp.toDate().toUTCString() : "Sending..."}</span>
                    </p>
                )
            ))}
           
        </div>
        <div className='chat_footer'>
            <InsertEmoticon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type='text' />
                <button type='submit' onClick={sendMessage}>
                    Send a message
                </button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat