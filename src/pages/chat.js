import {useEffect,useState,useContext} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {FaImage} from 'react-icons/fa';
import {HiDotsVertical} from 'react-icons/hi';
import {MdBlock} from 'react-icons/md';
import {useHistory,useParams} from 'react-router-dom';
import AxiosConfig from '../helpers/axiosconfig';
import AuthContext from '../context/userContext';
import baseURL from '../helpers/baseurl';

const Chat=()=>{

const history=useHistory();
const [chatinfo,setChatinfo]=useState([]);
const [loading,setLoading]=useState(true);
const [online,setOnline]=useState(false);
const [chataction,setChataction]=useState(false)
const { reciever_id } = useParams();
const {currentUser}=useContext(AuthContext);

//number of message
// const [msgnum,setmsgnum]=useState(10);


useEffect(()=>{
localStorage.setItem('msg-reciever',reciever_id);
//getting user info
async function chat_info(){
const token=localStorage.getItem('x-auth-token');	
const response=await AxiosConfig.post('/users/single_user',{user_id:reciever_id},{headers:{'x-auth-token':token}})
setChatinfo(response.data);
setOnline(response.data.status)
setLoading(false)
}
chat_info();

let chat_status=setInterval(async ()=>{

const status=await AxiosConfig.post('/users/user_status',{uid:reciever_id})
setOnline(status.data)

},10000)


//get messages

async function get_chats(){
const token=localStorage.getItem('x-auth-token')
const chats=await AxiosConfig.post('/message/all',{sender:currentUser.id,reciever:reciever_id,total:10},{headers:{'x-auth-token':token}})
const msg_wraper=document.getElementById("show_message_area");
//appending all the messages

chats.data.forEach(chat=>{
  
if(chat.sender===currentUser.id){

  let message=document.createElement('div');
  message.classList.add('user_msg');
  let text_msg=document.createElement('div');
  text_msg.classList.add('text_msg');
  text_msg.innerText=chat.text;
  message.append(text_msg);
  msg_wraper.append(message)

}else{

  let msg=document.createElement('div');
  msg.classList.add('sender_msg');
  let text_msg=document.createElement('div');
  text_msg.classList.add('text_msg');
  text_msg.innerText=chat.text;
  msg.append(text_msg);
  msg_wraper.append(msg)

}

msg_wraper.scrollTop=msg_wraper.scrollHeight;

})

//let sc=document.getElementById("show_message_area")
//sc.scrollTop=sc.scrollHeight

// await AxiosConfig.post('/message/seen',{sender:currentUser.id,reciever:reciever_id,pic:currentUser.avatar},{headers:{'x-auth-token':token}})
// const mssid=await AxiosConfig.post('/message/haveseen',{sender:currentUser.id,reciever:reciever_id},{headers:{'x-auth-token':token}})

// if(mssid){
// let get_msg=document.getElementById(mssid.data);
// let seen_box=document.getElementById('msg_seen');

// if(get_msg && !seen_box && chatinfo.avatar){
//   let el=document.createElement('div');
//   el.setAttribute('id','msg_seen');
//   let elm=document.createElement('img');
//   elm.src=baseURL+'/'+chatinfo.avatar;
//   el.append(elm);
//   get_msg.append(el);
// }
  
// }

}

get_chats()


//cleanup useEffect

return ()=>{
clearInterval(chat_status);
localStorage.setItem('msg-reciever',null);
}

},[reciever_id,
  currentUser.id,
  ]);

//sending message

async function send_message(e){

if(e.charCode===13){
    const token=localStorage.getItem('x-auth-token');
	let message=document.createElement('div');
	message.classList.add('user_msg');
	let text_msg=document.createElement('div');
	text_msg.classList.add('text_msg');
	text_msg.innerText=e.target.value;
	message.append(text_msg);

    let msg_box=document.getElementById('show_message_area');
    if(msg_box){
	  msg_box.append(message);
    msg_box.scrollTop=msg_box.scrollHeight;
	  let res=await AxiosConfig.post('/message/add',
	  	{sender:currentUser.id,reciever:reciever_id,msg:e.target.value,create_at:Date.now()},
	  	{headers:{'x-auth-token':token}})
    console.log(res.data)
    }
   
	e.target.value='';
  e.target.blur();

}

}




//set dot Typing
async function set_typing(){
  const token=localStorage.getItem('x-auth-token');
  await AxiosConfig.post('/typing/start',{sid:currentUser.id,rid:reciever_id},{headers:{'x-auth-token':token}}) 
}
//remove Typing animation
async function remove_typing(){
  const token=localStorage.getItem('x-auth-token');
  await AxiosConfig.post('/typing/stop',{rid:reciever_id,sid:currentUser.id},{headers:{'x-auth-token':token}}) 
}

return(
<>
<div className="chat_area_wraper">
<div className="chat_area">

<div className="chatarea_nav">

{
loading?
<div className="chatarea_loading_wraper">loading</div>:
<div className="chatarea_user">
<img src={baseURL+'/'+chatinfo.avatar} alt=""/>

<div className="chatarea_user_info">
<span>{chatinfo.name}</span>
{
online?
<div className="chatuser_online">
<div></div>
<span>Online</span>
</div>:
<div className="chatuser_offline">
<div></div>
<span>Offline</span>
</div>
}
</div> 	

</div>	
}

<div className="chatarea_icon">
<ul>
<li><BiArrowBack onClick={e=>history.push('/')}/></li>
<li>
<HiDotsVertical
onClick={e=>chataction?setChataction(false):setChataction(true)}
/>
</li>
</ul>

{
chataction?
<div className="chatuser_action">
<li><MdBlock/> <span>Block</span></li>
<li><MdBlock/> <span>Block</span></li>
</div>:null	
}

</div>

</div>

<div className="chat_area_messages" id="show_message_area">

</div>
<div className="chat_area_send">
  <div className="send_message">
   <input id="message_textarea"
    cols="1" placeholder="type here ..."
    onKeyPress={send_message}
    onFocus={set_typing}
    onBlur={remove_typing} 
     />
   <div className="send_image">
   <FaImage/>
   </div>
  </div>
</div>

</div>
</div>
</>
)
}

export default Chat;