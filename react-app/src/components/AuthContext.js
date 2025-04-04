import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(); 

const AuthProvider = ({children}) =>{
    const [loginStatus, setLoginStatus] = useState(false);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)){
          setLoginStatus(true);
        }
    },[])

  const isTokenExpired = (token) =>{
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp * 1000 < Date.now();
  };

  return(
    <AuthContext.Provider value={{loginStatus, setLoginStatus}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;
