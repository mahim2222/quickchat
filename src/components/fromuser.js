import {BiTime} from 'react-icons/bi';

const FromUser=(props)=>{
return(
<>
<div className="user_message_wraper">
<div className="user_message">
<div className="user_message_text">
  <p>{props.message}</p>
</div>
<div className="user_message_image">
{props.image?
  <img src={props.image} alt=""/>:null
}
</div>
<div className="user_message_time">
  <BiTime/> <span>{props.time}</span>
</div>
</div>
</div>
</>
)
}

export default FromUser;