
import { Navigate } from 'react-router-dom'

const RequireAuth:any = (params:any) => {
  if(typeof params.isAuthenticated === 'undefined'){
    //still loading
    return <div>Checking auth...</div>
  }
  var result:JSX.Element;
  if(params.isAuthenticated === true) {
    result = params.children;
  } else {
   console.log('redirecting to login');
   result = (<Navigate to='/' />)
  }
  return result;
}
export default RequireAuth;