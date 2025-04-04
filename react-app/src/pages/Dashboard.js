import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FetchDoctors from '../components/FetchComponent';

export default function Dashboard({status}){

    const navigateOut = useNavigate();
    const location = useLocation();

    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('');

    // useEffect(()=>{
    //     if(status === false){
    //         navigateOut('/login',{replace:true});
    //     }
    // }, [location.pathname]);

    return(
        <>
            <h1>Dashboard</h1>
            <FetchDoctors list={list} setList={setList} url="Doctors" showDelete='false' />
        </>
    )
}