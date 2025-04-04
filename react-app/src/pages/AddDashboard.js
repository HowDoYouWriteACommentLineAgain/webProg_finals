import React, {useState, useEffect, useCallback } from 'react';
import Inputs from '../components/Inputs';

export default function EditDashboard(){
    const [list, setList] = useState('');
    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [days, setDays] = useState('');
    const [avai, setAvai] = useState('');

    function handleSubmit(){
        if (!name || !spec || !days || !avai){
            alert('Please populate all inputs');
            return;
        }

        setName('');
        setSpec('');
        setDays('');
        setAvai('');
        addUser();
        
    }

    async function addUser(){
        try{
            const res = await fetch("http://localhost:5000/Doctors",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({name: name, specialization: spec, days: days, availability: avai})
            })

            if (!res.ok) {
                const errorText = await res.text(); // Get error details
                alert(errorText); // Show user-friendly alert
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }

            const newListItem = await res.json();
            setList(l => [...l, newListItem]);
            alert('Item added Successfuly');
        }catch(error){
            console.error("Error adding Doctor: ", error);
        }
    }

    return(
        <>
            <fieldset className="form need-validation">
                <h1>Edit Dashboard</h1>
                <Inputs value={name} name="name" placeholder='Insert Name'              onChange={(e)=>setName(e.target.value)} />
                <Inputs value={spec} name="spec" placeholder='Insert Specializations'   onChange={(e)=>setSpec(e.target.value)} />
                <Inputs value={days} name="days" placeholder='Insert Days Available'    onChange={(e)=>setDays(e.target.value)} />
                <Inputs value={avai} name="avai" placeholder='Insert Availability'      onChange={(e)=>setAvai(e.target.value)} />
                <button className='btn btn-primary mb-3'                                onClick={()=> handleSubmit()}>Submit</button>
            </fieldset>
        </>
    )
}