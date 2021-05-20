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

//message sound virtual dom


//message getting and displaying

socket.on('get_message',async message=>{
const msg_box=document.getElementById("show_message_area")
const current_reciever=localStorage.getItem('msg-reciever');
const blinkable=document.getElementById(message.sender)

if(current_reciever===message.sender && msg_box){
//creating message element
let msg_el=document.createElement('div')
msg_el.classList.add('sender_msg')
let text_msg=document.createElement('div')
text_msg.classList.add('text_msg')
text_msg.innerText=message.msg
msg_el.append(text_msg)

//appending message element
msg_box.append(msg_el)
msg_box.scrollTop=msg_box.scrollHeight;

}else if(blinkable){

blinkable.classList.add('msg_notify')

}

});

//set typing
socket.on('set_typing',rid=>{
let msg_rid=localStorage.getItem('msg-reciever')
let msg_box=document.getElementById('show_message_area');

if(msg_rid===rid && msg_box){

let typing_wraper=document.createElement('div')
typing_wraper.setAttribute('id','typing_wraper')
let typing_body=document.createElement('div')
typing_body.classList.add('chat-bubble')
let typing_inner=document.createElement('div')
typing_inner.classList.add('typing')

let dot1=document.createElement('div')
let dot2=document.createElement('div')
let dot3=document.createElement('div')
dot1.classList.add('dot')
dot2.classList.add('dot')
dot3.classList.add('dot')

typing_inner.append(dot1)
typing_inner.append(dot2)
typing_inner.append(dot3)

typing_body.append(typing_inner)

typing_wraper.append(typing_body)

msg_box.lastElementChild.after(typing_wraper)
msg_box.scrollTop=msg_box.scrollHeight;
}

})

//remove typing
socket.on('remove_typing',rid=>{
let msg_rid=localStorage.getItem('msg-reciever')
let msg_box=document.getElementById('show_message_area');
let typing_anime=document.getElementById('typing_wraper')
if(msg_rid===rid && msg_box && typing_anime){
 typing_anime.remove()
 msg_box.scrollTop=msg_box.scrollHeight;
}

})



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
