import React, {useState, useEffect} from 'react';
import DeleteUser from './DeleteUsers';

export default function FetchUsers({list, setList}){

    // useEffect(()=>{
    //     fetch("http://localhost:5000/Users")
    //         .then(res => res.json())
    //         .then(data => setList(data));
    // });

    const handleDelete = async (id) =>{

        await fetch(`http://localhost:5000/Users/${id}`,{method: "DELETE"});
        setList(list.filter(item => item._id !== id));
    }

    return (
        <ul>
            {list.map( listItem => (
                <li key={listItem._id}> <span>{listItem.username} <button onClick={() => handleDelete(listItem._id)}>Delete</button> </span> </li>
                ))}
        </ul>
  
    );
}