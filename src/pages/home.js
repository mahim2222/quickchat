import {BsPerson} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';
import {BiSearch} from 'react-icons/bi';
import {Link,useHistory} from 'react-router-dom';
import Logo from '../images/logo.png';
import ChatList from '../components/chatlist';
import {useContext,useEffect,useState} from 'react';
import AuthContext from '../context/userContext';
import SocketContext from '../context/socketcontext';
import AxiosConfig from '../helpers/axiosconfig';
import baseURL from '../helpers/baseurl';

const Home=()=>{
const history=useHistory();
const {setCurrentUser}=useContext(AuthContext);
const {mysocket}=useContext(SocketContext);
const [Users,setUsers]=useState([]);
const [screen,setScreen]=useState('Chats');


//runing initial useEffect

useEffect(()=>{

const auth_id=localStorage.getItem('auth-id');
const auth_token=localStorage.getItem('x-auth-token');

async function fetch_users(){

 const all_users=await AxiosConfig.post('/requests',{me:auth_id},{headers:{'x-auth-token':auth_token}});
 if(all_users.data){
 setUsers(all_users.data)
 }
}

fetch_users();

//real time socket.io

if(mysocket===null){

console.log('socket not available')

}else{

mysocket.on('take_message',data=>{
    console.log(data)
})

mysocket.on('testing_me',data=>{
    console.log(data)
})

}


},[mysocket]);

async function logoutHandler(){
    try{
    localStorage.clear();
    setCurrentUser(null);
    history.push('/login');
    }catch(err){console.log('failed to logout')}
}

async function chat_list(e){
    try{

    //setting screen
    const screens=document.querySelectorAll('.chat_user_tabs button');
    screens.forEach(screen=>{
        screen.classList.remove('active');
    });
    e.target.classList.add('active');
    const new_screen=e.target.innerHTML;
    setScreen(new_screen);
  }catch(err){
    console.log('failed to get chat list')
  }
    
    
}

//requests users

async function requests_list(e){
   
   try{
    
   //seting screen
   const screens=document.querySelectorAll('.chat_user_tabs button');
    screens.forEach(screen=>{
        screen.classList.remove('active');
    });
    e.target.classList.add('active');
    const new_screen=e.target.innerHTML;
    setScreen(new_screen);
    }catch(err){
        console.log('failed to get requests list')
    }

}

//all users

async function fetch_all_users(e){

   try{
    
   //seting screen
   const screens=document.querySelectorAll('.chat_user_tabs button');
    screens.forEach(screen=>{
        screen.classList.remove('active');
    });
    e.target.classList.add('active');
    const new_screen=e.target.innerHTML;
    setScreen(new_screen);

   }catch(err){
    console.log('something went wrong')
   }

}



return(
<>
<div className="chat_list_wraper">

<div className="chat_list">

<div className="chat_list_nav">
<div className="chat_list_nav_logo">
<img src={Logo} alt=""/>
</div>

<div className="chat_list_nav_menu">
<ul>
<li><Link to="/profile"><BsPerson/></Link></li>
<li onClick={logoutHandler}><BiLogOutCircle/></li>
</ul>
</div>
</div>

<div className="chat_list_search_wraper">
<div className="chat_list_search">
<BiSearch/>
<input type="text" placeholder="search users"/>
</div>

<div className="chat_user_tabs">
<button className="active" onClick={chat_list}>Chats</button>
<button onClick={requests_list}>Requests</button>
<button onClick={fetch_all_users}>All Users</button>
</div>

<div className="chat_users_list">

{
    screen==='Chats'?
    <div>
    {
    Users.map(user=>{
     return <ChatList
            key={user._id}
            user_id={user._id}
            pic={baseURL+'/'+user.avatar}
            name={user.name}
            last_active="10 min"
            />

    })
    }
   </div>:null
}

{
    screen==='Requests'?
    <div>
    
    </div>:null
}

{
    screen==='All Users'?
    <div>
    
    </div>:null
}

</div>
</div>

</div>

</div>
</>
)	
}

export default Home;