import {Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext, useEffect } from 'react';
const ProtectedRoutes = ({defaultPath}) => {

    const loggedin = useContext(AuthContext);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            <Navigate to={defaultPath} replace={true} />
        }
    },[])

    const isTokenValid = (token) => {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
          return decodedToken.exp * 1000 > Date.now(); // Return true if the token is valid
        } catch (error) {
          return false; // If there's an error in decoding, the token is invalid
        }
      };

    return (loggedin) ? <Outlet />: <Navigate to={defaultPath} replace={true} />;
      
}

export default ProtectedRoutes;