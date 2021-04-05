import {useEffect,useContext,useState} from 'react';
import pic from '../images/pic/pic1.jpg';
import {BiArrowBack} from 'react-icons/bi';
import {FaPhone} from 'react-icons/fa';
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {useHistory,useParams} from 'react-router-dom';
import SocketContext from '../context/socketcontext';

const Chat=()=>{

const {reciever_id}=useParams();
const history=useHistory();
const {mysocket}=useContext(SocketContext);

const [Typing,setTyping]=useState('');

useEffect(()=>{


if(mysocket===null){
console.log('no socket connection on chat.js')
}else{

mysocket.on('take_message',data=>{
	console.log(data)
})


//message getting and displaying

mysocket.on("get_message",async msg=>{
   
    const show_message=document.getElementById('show_message_area');
	
	//creating show message dom
	const user_msg_wraper=document.createElement('div');
	user_msg_wraper.classList.add('user_message_wraper');
	const user_msg=document.createElement('div');
	user_msg.classList.add('user_message');
    //making text element
	const user_msg_text=document.createElement('div');
	user_msg_text.classList.add('user_message_text');
	const p_text=document.createElement('p');
	p_text.innerText=msg.message;
	user_msg_text.append(p_text);
    //making time element
    const user_msg_time=document.createElement('div');
    user_msg_time.classList.add('user_message_time');
    const span_time=document.createElement('span');
    span_time.innerText=msg.time;
    user_msg_time.append(span_time);

    user_msg.append(user_msg_text);
    user_msg.append(user_msg_time);
    user_msg_wraper.append(user_msg);

    show_message.append(user_msg_wraper);


	show_message.scrollTop=show_message.scrollHeight;

    })


}

},[mysocket]);

//sending message

async function send_message(e){

if(e.key==='Enter'){
	var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    const auth_id=localStorage.getItem('auth-id');
	const new_message={sender:auth_id,message:Typing,time:myDate,reciever:reciever_id};
	
	const msg_textarea=await document.getElementById('message_textarea');
	msg_textarea.value='';
	const show_message=await document.getElementById('show_message_area');
	
	//creating my message dom
	const my_msg_wraper=document.createElement('div');
	my_msg_wraper.classList.add('my_message_wraper');
	const my_msg=document.createElement('div');
	my_msg.classList.add('my_message');
	const my_msg_text=document.createElement('div');
	my_msg_text.classList.add('my_message_text');
	const my_msg_time=document.createElement('div');
	my_msg_time.classList.add('my_message_time');
    
    //my message dom value;
    const span_time=document.createElement('span');
    span_time.innerText=myDate;
    my_msg_time.append(span_time);

    //my message dom text value

    const p_text=document.createElement('p');
    p_text.innerText=Typing;
    my_msg_text.append(p_text);

    my_msg_wraper.append(my_msg);
    my_msg.append(my_msg_text);
    my_msg.append(my_msg_time);

    show_message.append(my_msg_wraper)
    
    //auto scroll
	show_message.scrollTop=show_message.scrollHeight;
    
    mysocket.emit('send_message',new_message);

}

}

//base 64 converter image



return(
<>
<div className="chat_area_wraper">
<div className="chat_area">

<div className="chat_area_nav">

<div className="chat_area_nav_user">
<img src={pic} alt=""/> 
<span>Mark Messer</span> 
<div className="user_status_online"></div>
</div>

<div className="chat_area_nav_icons">
<ul>
<li><FaPhone/></li>
<li><BiDotsVerticalRounded/></li>
<li onClick={e=>history.goBack()}><BiArrowBack/></li>
</ul>
</div>

</div>
<div className="chat_area_messages" id="show_message_area">


</div>
<div className="chat_area_send">
  <div className="send_message">
   <input id="message_textarea" cols="1" placeholder="type here ..." onChange={e=>setTyping(e.target.value)} onKeyPress={send_message} />
  </div>
</div>

</div>
</div>
</>
)
}

export default Chat;