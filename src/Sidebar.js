import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerction from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from "@mui/icons-material"
import SidebarChat from './SidebarChat';
import db from './firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { useStateValue } from './StateProvider';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    onSnapshot(collection(db, 'rooms'), (snapshot) => (
        setRooms(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data(),
            }
        )))
    ));
  }, []);

  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <div className='sidebar_headerLeft'>
                <Avatar src={user.photoURL}/>
            </div>
            <div className='sidebar_headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVerction />
                </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat' type='text' />
            </div>
        </div>
        <div className='sidebar_chats'>
            <SidebarChat addNewRoom/>
            {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} /> 
            ))}
        </div>
    </div>
  )
}

export default Sidebar