import {BiTime} from 'react-icons/bi';

const FromMe=(props)=>{
return(
<>
<div className="my_message_wraper">
<div className="my_message">

<div className="my_message_text">
<p>{props.message}</p>
</div>

<div className="my_message_image">
{props.image?
<img src={props.image} alt=""/>:null
}
</div>

<div className="my_message_time">
<BiTime/> <span>{props.time}</span>
</div>

</div>
</div>
</>
)
}

export default FromMe;