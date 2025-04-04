import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

export default function FetchUsers({list, setList, url, showDelete, filter}){

    useEffect(()=>{
        fetch(`http://localhost:5000/${url}`)
            .then(res => res.json())
            .then(data => setList(data));
    }, []);

    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) =>{
        const token = localStorage.getItem("token");
        if(!token) throw new Error("No Token Found");
        const res = await fetch(`http://localhost:5000/${url}/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(res.status === 401){
            alert('Session Error. Please log again');
            navigate('/login',{replace:true});
        }

        // const data = await res.json();
        console.log(res.status);
        if(res.status === 200) setList(list.filter(item => item._id !== id));
    }

    function capitalizeFirst(val){
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    function appendMD(key, val){
        return (key === 'name') && val + ' MD.' || val;
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    { list[0] && Object.keys(list[0]).map(jsonKey => (jsonKey !== '_id' && jsonKey !== 'password' && jsonKey !== '__v' && <th key={jsonKey}>{capitalizeFirst(jsonKey)}</th>))}
                    { (showDelete === true) && (<th>Actions</th>)}
                </tr>
            </thead>
            <tbody>
                {list.map( listItem => (
                    <tr key={listItem._id}> 
                        {
                            Object.keys(listItem).map(jsonKey => (jsonKey !== '_id' && jsonKey !== 'password' && jsonKey !== '__v' && (<td key={jsonKey}>{appendMD(jsonKey,listItem[jsonKey])}</td>)))
                        }
                        {(showDelete === true) &&   <td><button onClick={() => handleDelete(listItem._id)}>Delete</button> </td>}

                        {/* 
                            fist map takes the list of objects into
                            list Items. Then Object.Keys.map takes each 
                            object's content gets the key for those
                            key and extracts it with listItem[key]
                        */}
                        {/* <td>{listItem.username} </td>
                        <td><button onClick={() => handleDelete(listItem._id)}>Delete</button> </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
  
    );
}

// {list.map( listItem => (
//     <tr key={listItem._id}> 
//         <td>{listItem.username} </td>
//         <td><button onClick={() => handleDelete(listItem._id)}>Delete</button> </td>
//     </tr>
// ))}