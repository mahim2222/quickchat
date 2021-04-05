import {Link} from 'react-router-dom';

const ChatList=(props)=>{
return(
<Link to={'/chat/'+props.user_id}>
<div className="chat_users">

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
<span>{props.last_active}</span>
</div>

</div>

</div>
</Link>
)
}

export default ChatList;