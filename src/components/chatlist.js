import {useState,useEffect} from 'react';
import AxiosConfig from '../helpers/axiosconfig';
import {Link} from 'react-router-dom';

const ChatList=(props)=>{

const [online,setOnline]=useState(props.status);

useEffect(()=>{

let list_status=setInterval(async ()=>{
const status=await AxiosConfig.post('/users/user_status',{uid:props.user_id});
setOnline(status.data)

},30000)

return ()=>{
clearInterval(list_status);	
}

},[props.user_id]);

return(
<Link to={'/chat/'+props.user_id}>
<div className="chat_users" id={props.user_id}>

<div className="chat_users_image">
<img src={props.pic} alt=""/>
</div>

<div className="chat_users_info">

<div>
<h5>{props.name}</h5>
<p>{props.last_message}

</p>
</div>
<div className="users_status" id={props.user_id}>
{
online?
<span>Online</span>:
<span>Offline</span>	
}
</div>

</div>

</div>
</Link>
)
}

export default ChatList;