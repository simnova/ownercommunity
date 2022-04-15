import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from "@apollo/client";
import { LoggedInUserContainerCurrentUserQueryDocument } from '../../../../generated';

import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useMsal } from '../../../shared/msal-react-lite';


const ComponentProps = {
  autoLogin: PropTypes.bool,
}

interface ComponentPropInterface {
  autoLogin: boolean;
}

export type HeaderPropTypes = PropTypes.InferProps<typeof ComponentProps> & ComponentPropInterface;

export const LoggedInUserContainer: React.FC<HeaderPropTypes> = (props) => {
  const { getIsLoggedIn, login, logout, registerCallback } = useMsal();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean|undefined>(undefined);

  const [loadUser,{called,loading, data, error}] = useLazyQuery(LoggedInUserContainerCurrentUserQueryDocument,{
    variables: {
    }
  })

  useEffect(() => {
    registerCallback('account',(result,authResult) => {
      const redirectToCommunity = async (redirectedUrl:string) => {
        try {
          const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/community-domains/${redirectedUrl}`);
          const jsonResponse = await api_call.json();
          if(jsonResponse && jsonResponse.communityId ){
            console.log('found community-id:',jsonResponse.communityId);
            window.location.replace(`${redirectToCommunity}${window.location.pathname}`);
          }
        } catch (fetchError) {
          console.log('redirect-to-community-error:',fetchError);
        }
      }
      setIsLoggedIn(result);
       if(!called && result) {
        let currentUrl = `${window.location.protocol}//${window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '')}`;
        if(authResult ){
          //let redirectedUrl = authResult.state;
          //console.log('redirected-community-url:',authResult.state)
          
          if(
            currentUrl !== process.env.REACT_APP_AAD_REDIRECT_URI ||
            !(
              window.location.pathname.startsWith('/accounts') ||
              window.location.pathname.startsWith('/community') 
            )
          ){
            
            window.location.replace(`${process.env.REACT_APP_AAD_REDIRECT_URI}/accounts`);
            //redirectToCommunity(redirectedUrl);
          }
        }
        console.log('user-container-callback2',result,authResult);
        loadUser()
       }
    });

  }, [registerCallback,loadUser,called]);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn('account'));
    /*
    if(!called){
      loadUser()
     }
     */
  }, [getIsLoggedIn,loadUser,called]);

  /*
  if(props.autoLogin && !isLoggedIn){
    
  }
  */
  
  const handleLogin = async() => {
    const communityUrl = localStorage.getItem('communityUrl')
    if(communityUrl){
      await login('account',{state:communityUrl})
    }else{
      await login('account');
    }
  }
  const handleSignUp = async() => {
    await login('account',{params:new Map<string,string>([['option','signup']])});
  }
  const handleLogout = async() => {
    await logout('account');
  }

  

  if(isLoggedIn === true) {
    if(!called){
     // loadUser()
    }
    if(called && loading){
      return <div>Loading...</div>
    }
    if(called && error){
      return <div>Error :( {JSON.stringify(error)}
      </div>
    }
    if(called && data){

      const userData:LoggedInUserPropTypes = {data:{
        isLoggedIn:true,
        firstName:data.currentUser!.firstName??'',
        lastName:data.currentUser!.lastName??'',
        notificationCount:0,  
        profileImage:data.currentUser!?`https://sharethrift.blob.core.windows.net/public/${data.currentUser!.id}`:'',      
      }}

      return <LoggedInUser data={userData.data}
      onLogoutClicked={handleLogout}  />
    }
    return <>
      <div>
        <h1>HELLO THERE</h1>
      </div>
    </>

  }else if(isLoggedIn === false){
    return <>
      <LoggedInUser 
        data={{isLoggedIn:false}} 
        onLoginClicked={handleLogin}
        onSignupClicked={handleSignUp}  
         />
    </>
  } else {
   // setIsLoggedIn(getIsLoggedIn('account'));
   
    return <div>Don't Know...</div>
  }

    



  

}