import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
import db from './firebase';
import { Link } from "react-router-dom";
import { doc, collection, query, addDoc, orderBy, onSnapshot } from "firebase/firestore";


function SidebarChat({ id, name, addNewRoom }) {

  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      onSnapshot(query(collection(doc(db, 'rooms', id), 'messages'), orderBy('timestamp', 'desc')), (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      await addDoc(collection(db, 'rooms'), {
        name: roomName,
      });
    }
  }

  return addNewRoom ?
  (
    <div className='sidebarChat' onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  )
  :
  (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
          <Avatar />
          <div className='sidebarChat_info'>
              <h2>{name}</h2>
              <p>{messages[0] ? messages[0].message : "chat"}</p>
          </div>
      </div>
    </Link>
  )
}

export default SidebarChat