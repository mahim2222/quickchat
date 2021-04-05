import {BrowserRouter,Route} from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import {useState,useEffect} from 'react';
import AxiosConfig from './helpers/axiosconfig';
import Private from './components/privateroute';
import AuthContext from './context/userContext';
import SocketContext from './context/socketcontext';
import io from 'socket.io-client';
import baseURL from './helpers/baseurl';


function App() {

const [currentUser,setCurrentUser]=useState(null);
const [mysocket,setMysocket]=useState(null);

useEffect(()=>{

const socket=io(baseURL);
setMysocket(socket);

async function get_user(){

const token=localStorage.getItem('x-auth-token');
if(!token || token===''){
  console.log('you are not logged in');
}else{
  try{
   const get_user=await AxiosConfig.post('/users/verify',null,{headers:{'x-auth-token':token}});
   setCurrentUser(get_user.data);
   const auth_id=get_user.data.id;
   socket.emit('take_me',auth_id);
   setMysocket(socket);
  }catch(err){
  	console.log('something went wrong in app.js')
  }
  
}

}

get_user();

},[]);

return (
<>
<BrowserRouter>
<AuthContext.Provider value={{currentUser,setCurrentUser}}>
<SocketContext.Provider value={{mysocket,setMysocket}}>
<Private exact path="/" component={Home}/>
<Private exact path="/chat/:reciever_id" component={Chat}/>
<Private exact path="/profile" component={Profile}/>
<Route exact path="/login" component={Login}/>
<Route exact path="/register" component={Register}/>
</SocketContext.Provider>
</AuthContext.Provider>
</BrowserRouter>
</> 
);
}

export default App;
