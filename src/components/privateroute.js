import {Route,Redirect} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../context/userContext';


const Private=({component:Component,...rest})=>{

const {currentUser}=useContext(AuthContext);

return(

<Route {...rest}
render={props => (currentUser ?<Component {...props} />: <Redirect to="/login" />)} />

)
}

export default Private;