import {BsPerson} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';
import {BiSearch} from 'react-icons/bi';
import {Link,useHistory} from 'react-router-dom';
import Logo from '../images/logo.png';
import ChatList from '../components/chatlist';
import {useEffect,useState,useContext} from 'react';
import AxiosConfig from '../helpers/axiosconfig';
import AuthContext from '../context/userContext';
import baseURL from '../helpers/baseurl';

const Home=()=>{
const history=useHistory();
const [Users,setUsers]=useState([]);
const {currentUser}=useContext(AuthContext);


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

},[]);

async function logoutHandler(){
    try{
    localStorage.clear();
    const token=localStorage.getItem('x-auth-token');
    await AxiosConfig.post('/remove_socket',{user_id:currentUser.id},{headers:{'x-auth-token':token}})
    history.push('/login');
    }catch(err){console.log('failed to logout')}
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
<button className="active">Chats</button>
<button>Requests</button>
<button>All Users</button>
</div>

<div className="chat_users_list">

    <div>
    {
    Users.map(user=>{
     return <ChatList
            key={user._id}
            user_id={user._id}
            pic={baseURL+'/'+user.avatar}
            name={user.name}
            status={user.isonline}
            />

    })
    }
   </div>


</div>
</div>

</div>

</div>
</>
)	
}

export default Home;