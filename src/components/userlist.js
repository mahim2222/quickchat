import {HiUserAdd} from 'react-icons/hi';


const Userlist=(props)=>{


return(
<>
<div className="chat_users">

<div className="chat_users_image">
<img src={props.pic} alt=""/>
</div>

<div className="chat_users_info">

<div>
<h5>{props.name}</h5>
</div>
<div>
<button><HiUserAdd/>Request</button>
</div>

</div>

</div>
</>
)
}

export default Userlist;