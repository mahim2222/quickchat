import {useContext,useEffect,useState} from 'react';
import {FiEdit} from 'react-icons/fi';
import AuthContext from '../context/userContext';
import baseURL from '../helpers/baseurl';
import AxiosConfig from '../helpers/axiosconfig';

const Profile=()=>{

const [mypic,setMypic]=useState('');
const [edit,setEdit]=useState(false);
const {currentUser}=useContext(AuthContext);

useEffect(()=>{

if(currentUser){
setMypic(currentUser.avatar)
}

},[currentUser])


//function set edit
function set_edit(){
	edit?setEdit(false):setEdit(true);
}

async function change_pic(e){


var formData=new FormData();
const auth_token=localStorage.getItem('auth-token');
const auth_id=localStorage.getItem('auth-id');

formData.append('image',e.target.files[0]);
formData.append('my_id',auth_id);

const pic_changed=await AxiosConfig.post('/profile/updatepic',formData);
setMypic(pic_changed.data);

}

return(
<>

<div id="profile_wraper">
<div id="profile">
<div className="profile_image">

<img src={baseURL+'/'+mypic} alt=""/>


{edit?
<div className="profile_image_uploader">
<input type="file" onChange={change_pic} />
</div>:null
}

</div>

<div className="edit_icon">
<FiEdit onClick={set_edit} />
</div>

</div>

</div>

</>
)
}

export default Profile;