import logo from './logo.svg';
import './App.css';
import 'stream-chat-react/dist/css/index.css';

import {StreamChat, streamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
// import 'stream-chat-react/dist/css/index.css';
import { ChannelContainer, ChannelListContainer, Auth } from './components';
import { useState } from 'react';
const apiKey = "496seungsaf8";
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get('token');
if(authToken) {
  client.connectAnonymousUser({
    id : cookies.get('userId'),
    name:  cookies.get('userName'),
    fullName:  cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    image : cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword')
  } , authToken)
}

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  if(!authToken) return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light' >
        <ChannelListContainer 
        isCreating = {isCreating} 
        setisCreating = {isCreating}
        isEditing = {isEditing}
        setisEditing = {isEditing}
        setCreateType = {setCreateType}
         />
        <ChannelContainer 
        isCreating = {isCreating} 
        setisCreating = {isCreating}
        isEditing = {isEditing}
        setisEditing = {isEditing}
        createType = {createType }/>
      </Chat>
     
    </div>
  );
}

export default App;
