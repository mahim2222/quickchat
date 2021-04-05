import {Route,Redirect} from 'react-router-dom';


const Private=({component:Component,...rest})=>{

const currentUser=localStorage.getItem('x-auth-token');

return(

<Route {...rest}
render={props => (currentUser ?<Component {...props} />: <Redirect to="/login" />)} />

)
}

export default Private;