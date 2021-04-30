import { React } from 'react';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import {useState,useEffect} from 'react';
import AxiosConfig from './helpers/axiosconfig';
import Private from './components/privateroute';
import AuthContext from './context/userContext';
import io from 'socket.io-client';
import baseURL from './helpers/baseurl';


function App() {

const [currentUser,setCurrentUser]=useState(null);
const [re,setRe]=useState('/');

useEffect(()=>{

const socket=io(baseURL);

socket.on('connect',async ()=>{
localStorage.setItem('socket-id',socket.id)
const token=localStorage.getItem('x-auth-token');

if(token && token!==''){

const user_info=await AxiosConfig.post('/verify',{socket:socket.id},{headers:{'x-auth-token':token}});
setCurrentUser(user_info.data)

}else{
setRe('/login')
}

});

//message getting and displaying

socket.on('get_message',async message=>{

let msg_rev=localStorage.getItem('msg-reciever');
//create message
if(msg_rev===message.sender){

let msg=document.createElement('div');
msg.classList.add('sender_msg');
let text_msg=document.createElement('div');
text_msg.classList.add('text_msg');
text_msg.innerText=message.msg;
msg.append(text_msg);

let msg_box=document.getElementById('show_message_area');

if(msg_box){
  msg_box.append(msg);
}

}

});


},[]);

return (
<>
<BrowserRouter>
<AuthContext.Provider value={{currentUser,setCurrentUser}}>
{
currentUser?
<>
<Private exact path="/" component={Home}/>
<Private exact path="/chat/:reciever_id" component={Chat}/>
<Private exact path="/profile" component={Profile}/>
</>:<Redirect to={re} />
}
<Route exact path="/login" component={Login}/>
<Route exact path="/register" component={Register}/>
</AuthContext.Provider>
</BrowserRouter>
</> 
);
}

export default App;
