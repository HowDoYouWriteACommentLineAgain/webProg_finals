import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = ({setLoginStatus}) =>{
    
    const navigate = useNavigate();
    useEffect(()=>{
        (()=>{
            setLoginStatus(false);
            localStorage.removeItem('token');
            navigate('/', {replace:true});
        })();
    })


    return(
        <>
            Loading...
        </>
    )

}

export default Logout;