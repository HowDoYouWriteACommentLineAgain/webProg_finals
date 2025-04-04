import React, {useState, useEffect } from 'react';
import Inputs from '../components/Inputs';
import FetchUsers from '../components/FetchComponent';

export default function UsersCrud(){
    const [list, setList] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    function handleClick(){
        
        const form = document.querySelector('.need-validation');
        form.classList.add('was-validated');

        if((password !== cPassword)) {
            alert(`Passwords don't match`);
            return;
        }else if(!username || !password || !cPassword) {
            alert(`One or more fields are missing.`);
            return;
        }; //early return if fields are empty

        
        form.classList.remove('was-validated');
        setUsername('');
        setPassword('');
        setCPassword('');
        addUser();
    }

    const handleChange = (stateSetter) => e => {
        const content = e.target.value;
        stateSetter(content);
        //todo add component targeting self to change is-invalid and is-valid tags
    }

    const pInput = document.getElementsByName('password')[0];
    const cPInput = document.getElementsByName('confirmPassword')[0];

    useEffect(()=>{
        if(password !== cPassword ){
            pInput.classList.add('is-invalid');
            cPInput.classList.add('is-invalid');
        }
        else{
            if (pInput && pInput.classList.contains('is-invalid')) pInput.classList.remove('is-invalid');
            if (cPInput && cPInput.classList.contains('is-invalid')) cPInput.classList.remove('is-invalid');
        }
    },[password,cPassword])

    async function addUser(){
        try{
            console.log("Sending data:", { username, password }); // Debugging
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/Users", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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

    const InputsClassName = "form-control form-control-lg mb-3";

    return (
    <>
        <fieldset className='form need-validation'>
            <h1>User registration</h1>
            <Inputs
                className={InputsClassName}
                types="text" 
                name="username" 
                placeholder="username" 
                value={username} 
                onChange={handleChange(setUsername)}
            />
            <Inputs
                className={InputsClassName}
                types="password" 
                name="password" 
                placeholder="password" 
                value={password} 
                onChange={handleChange(setPassword)}
            />
            <Inputs
                className={InputsClassName}
                types="password" 
                name="confirmPassword" 
                placeholder="confirm password" 
                value={cPassword} 
                onChange={handleChange(setCPassword)}
            />
            <Inputs types="submit" name="submit" onClick={()=>handleClick()}/>
        </fieldset>
        <FetchUsers list={list} setList={setList} url="Users" showDelete={true}/>
    </>
  
    );
}