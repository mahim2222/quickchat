import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';
import {useState,useContext} from 'react';
import AuthContext from '../context/userContext';
import AxiosConfig from '../helpers/axiosconfig';
import {useHistory} from 'react-router-dom';

const Register=()=>{
const history=useHistory();
const {setCurrentUser}=useContext(AuthContext);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);
const [name,setName]=useState('');
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [confirm,setConfirm]=useState('');

async function RegisterHandler(e){
  e.preventDefault();
  
  try{
  setLoading(true);
  const new_user=await AxiosConfig.post('/users/register',{name:name,username:username,password:password,confirm:confirm});
  
  if(new_user){
  const logged=await AxiosConfig.post('/users/login',{username:username,password:password});
  localStorage.setItem('x-auth-token',logged.data.token);
  localStorage.setItem('auth-id',logged.data.user.id);
  setCurrentUser(logged.data.user);
  await AxiosConfig.post('/set_socket',{user_id:logged.data.user.id,socket:localStorage.getItem('socket-id')})
  history.push('/');
  }

  }catch(err){
  	setError(err.response.data.message);
  	setLoading(false);
  }

}

return(
<>
<div className="auth_form_wraper">

<div className="auth_form_logo">
<img src={Logo} alt=""/>
</div>

<div className="auth_form">

<form onSubmit={RegisterHandler}>

<h4>Register</h4>

{
 error?
 <div className="auth_form_error">
 <span>{error}</span>
</div>:null
}

<div className="auth_form_field">
<label>Name *</label>
<input type="text"
 placeholder="Your Name"
 onChange={e=>setName(e.target.value)}
/>
</div>

<div className="auth_form_field">
<label>Username *</label>
<input type="text"
placeholder="Username"
onChange={e=>setUsername(e.target.value)}
/>
</div>

<div className="auth_form_field">
<label>Password *</label>
<input type="password"
 placeholder="Password"
 onChange={e=>setPassword(e.target.value)}
 />
</div>

<div className="auth_form_field">
<label>Confirm Password *</label>
<input type="password"
 placeholder="Confirm Password"
 onChange={e=>setConfirm(e.target.value)}
 />
</div>

<div className="auth_form_field">
<button disabled={loading}>Register</button>
</div>

<div className="auth_form_navigate">
  <span>Already have an acount <Link to="/login">Login</Link></span>
</div>

</form>

</div>

</div>
</>
)
}

export default Register;