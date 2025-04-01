import {useState, useEffect} from 'react';
import Inputs from './Inputs';

export default function DeleteUser(){
    const [list, setList] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    useEffect(()=>{
        console.clear();
        console.table(username,password);
        console.log(list);  
    }, [username, password]);

    function handleClick(){
        setUsername('');
        setPassword('');
        setCPassword('');
    }

    useEffect(()=>{
        fetch("http://localhost:5000/Users")
            .then(res => res.json())
            .then(data => setList(data));
    });

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