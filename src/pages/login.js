import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';
import {useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../context/userContext';
import AxiosConfig from '../helpers/axiosconfig';

const Login=()=>{
const history=useHistory();
const {setCurrentUser}=useContext(AuthContext);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(false);
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');

async function LoginHandler(e){
	e.preventDefault();
	try{
	setLoading(true);
    const logged=await AxiosConfig.post('/users/login',{username:username,password:password});
	localStorage.setItem('x-auth-token',logged.data.token);
	localStorage.setItem('auth-id',logged.data.user.id);
	setCurrentUser(logged.data.user);
	await AxiosConfig.post('/set_socket',{user_id:logged.data.user.id,socket:localStorage.getItem('socket-id')})
	history.push('/');
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

<form onSubmit={LoginHandler}>

<h4>Sign In</h4>

{
error?
<div className="auth_form_error">
<span>{error}</span>
</div>:null
}

<div className="auth_form_field">
<label>Username *</label>
<input type="text" 
placeholder="Enter Username"
onChange={e=>setUsername(e.target.value)}
/>
</div>

<div className="auth_form_field">
<label>Password *</label>
<input type="text" 
placeholder="Enter Password" 
onChange={e=>setPassword(e.target.value)}
/>
</div>

<div className="auth_form_field">
<button disabled={loading}>Sign In</button>
</div>

<div className="auth_form_navigate">
  <span>Don't have an acount <Link to="/register">Register</Link></span>
</div>

</form>

</div>

</div>
</>
)
}

export default Login;