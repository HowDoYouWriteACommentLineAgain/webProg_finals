import {useState, useEffect} from 'react';
import Inputs from './Inputs';

export default function(){
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

        addUser();
    }

    async function addUser(){
        const cPasswordsMatch = (password === cPassword);

        if(!cPasswordsMatch) {
            alert(`Passwords don't match`);
            return;
        }else if(!username || !password || !cPassword) {
            alert(`One or more fields are missing.`);
            return;
        }; //early return if fields are empty

        try{
            console.log("Sending data:", { username, password }); // Debugging
            const res = await fetch("http://localhost:5000/Users", {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({username: username, password: password})
            })

            if (!res.ok) {
                const errorText = await res.text(); // Get error details
                alert(errorText); // Show user-friendly alert
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }

            const newListItem = await res.json();
            setList( l => [...l, newListItem]);

        }catch(error){
            console.error("Error adding user:", error);
        }
    }

    return (
    <fieldset className='form'>
        <h1>User registration</h1>
        <Inputs 
            types="text" 
            name="username" 
            placeholder="username" 
            value={username} 
            onChange={(e)=> setUsername(e.target.value)}
        />
        <Inputs 
            types="text" 
            name="password" 
            placeholder="password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
        />
        <Inputs 
            types="text" 
            name="confirmPassword" 
            placeholder="confirm password" 
            value={cPassword} 
            onChange={(e)=> setCPassword(e.target.value)}
        />
        <Inputs types="submit" name="submit" onClick={()=>handleClick()}/>
    </fieldset>
  
    );
}