import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function Dashboard({status}){

    const navigateOut = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(status === false){
            navigateOut('/login',{replace:true});
        }
    }, [location.pathname]);

    return(
        <>
            <h1>Work in Progress</h1>
        </>
    )
}