import { useEffect, useState } from "react";
import FetchDoctors from '../components/FetchComponent';
import checkToken from "../scripts/checkToken";

export default function Dashboard({loginStatus}){
    const [list, setList] = useState([]);
    const [deletePermission, permitDelete] = useState(false);

    useEffect(()=>{
        const checkForToken = async () =>{
            const isTokenValid = await checkToken();
            permitDelete(isTokenValid);
        }
        checkForToken();
    },[loginStatus]);


    return(
        <>
            <h1>Dashboard</h1>
            <FetchDoctors list={list} setList={setList} url="Doctors" showDelete={deletePermission} />
        </>
    )
}