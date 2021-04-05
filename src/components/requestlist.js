import {IoMdAdd} from 'react-icons/io';


const Requestlist=(props)=>{


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
<button><IoMdAdd/>Add</button>
</div>

</div>

</div>
</>
)
}

export default Requestlist;