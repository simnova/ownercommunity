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
  const { getIsLoggedIn, login, logout, registerCallback, getSilentAuthResult } = useMsal();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean|undefined>(undefined);

  const [loadUser,{called,loading, data, error}] = useLazyQuery(LoggedInUserContainerCurrentUserQueryDocument,{
    variables: {
    }
  })

  useEffect(() => {
    registerCallback('account',(result,authResult) => {
      setIsLoggedIn(result);
      if(!called && result) {
        let currentUrl = `${window.location.protocol}//${window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '')}`;
        
        if( //if on an unauthenticated page redirect to community selection page
          (currentUrl !== process.env.REACT_APP_AAD_REDIRECT_URI) ||
          !(
            window.location.pathname.startsWith('/accounts') ||
            window.location.pathname.startsWith('/community') 
          )
        ){
          window.location.href = (`${process.env.REACT_APP_AAD_REDIRECT_URI}/accounts`);
        }else{
          console.log('user-container-callback2',result,authResult);
          loadUser().catch(e => console.error(e));
        }
      }
    });
  }, [registerCallback,loadUser,called]);

  useEffect(() => {
    const determineIfUserHasActiveSession = async () => {
      var authResult =  await getSilentAuthResult('account');
      if(authResult) {
        setIsLoggedIn(true);
        loadUser().catch(e => console.error(e));
      }
    }

    if(!isLoggedIn){
      //check to see if user is logged in - only initiated if not logged in
      let logInResult = getIsLoggedIn('account');
      if(logInResult){
        determineIfUserHasActiveSession();
      }
    }
  }, [isLoggedIn,getSilentAuthResult,getIsLoggedIn,setIsLoggedIn,loadUser]);


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

  if(called && isLoggedIn === true) {
    if(loading){
      return <div>Loading...</div>
    }
    if(error){
      return <div>Error :( {JSON.stringify(error)}
      </div>
    }
    if(data){
      const userData:LoggedInUserPropTypes = {data:{
        isLoggedIn:true,
        firstName:data.currentUser!.firstName??'',
        lastName:data.currentUser!.lastName??'',
        notificationCount:0,  
        profileImage:data.currentUser!?`https://sharethrift.blob.core.windows.net/public/${data.currentUser!.id}`:'',      
      }}
      return <LoggedInUser data={userData.data} onLogoutClicked={handleLogout}  />
    }
  }
  //catch-all return
  return <>
    <LoggedInUser 
      data={{isLoggedIn:false}} 
      onLoginClicked={handleLogin}
      onSignupClicked={handleSignUp}  
      />
  </>
  
}