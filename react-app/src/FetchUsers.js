import React, {useState, useEffect} from 'react';
import DeleteUser from './DeleteUsers';

export default function FetchUsers(){
    const [list, setList] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/Users")
            .then(res => res.json())
            .then(data => setList(data));
    });


    return (
        <ul>
            {list.map( listItem => (
                <li key={listItem._id}> <span>{listItem.username} <button onClick={() => handleDelete(listItem._id)}>Delete</button> </span> </li>
                ))}
        </ul>
  
    );
}