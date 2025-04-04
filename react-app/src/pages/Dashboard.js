import { useEffect, useState } from "react";
import FetchDoctors from '../components/FetchComponent';

export default function Dashboard(){
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