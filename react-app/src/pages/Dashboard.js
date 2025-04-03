import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function Dashboard({status}){

    const navigateOut = useNavigate();
    const location = useLocation();

    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(()=>{
        if(status === false){
            navigateOut('/login',{replace:true});
        }
    }, [location.pathname]);

    return(
        <>
            <h1>Dashboard</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-2">Name: </th>
                        <th className="col-1">Specialization:  </th>
                        <th className="col-1">Days On Duty: </th>
                        <th className="col-2">Nurses: </th>
                        <th className="col-1">Currently Available: </th>
                    </tr>
                </thead>
                <tbody>
                    {/* insert map function */}
                </tbody>
            </table>
        </>
    )
}