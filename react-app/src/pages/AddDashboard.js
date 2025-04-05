import React, {useRef, useState } from 'react';
import Inputs from '../components/Inputs';

export default function AddDashboard(){
    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [days, setDays] = useState('');
    const [avai, setAvai] = useState('');

    const form = useRef(null);
    const iName = useRef(null);
    const iSpec = useRef(null);
    const iDays = useRef(null);
    const iAvai = useRef(null);


    function handleSubmit(){
        form.current.classList.add('was-validated');
        if (!name || !spec || !days || !avai){
            return;
        }

        if(!name) iName.current.classList.add('is-invalid');
        if(!spec) iSpec.current.classList.add('is-invalid');
        if(!days) iDays.current.classList.add('is-invalid');
        if(!avai) iAvai.current.classList.add('is-invalid');


        setName('');
        setSpec('');
        setDays('');
        setAvai('');
        addUser();
        
    }

    const handleChange = (stateSetter) => e => {
        const content = e.target.value;
        e.target.classList.remove('is-invalid');
        stateSetter(content);
        
      }

    async function addUser(){
        try{
            console.log("Sending data:", [name, spec, days, avai]); // Debugging
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/Doctors",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body:JSON.stringify({name: name, specialization: spec, days: days, availability: avai})
            })

            if (!res.ok) {
                const errorText = await res.text(); // Get error details
                alert(errorText); // Show user-friendly alert
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }
            
            alert('Item added Successfuly');
        }catch(error){
            console.error("Error adding Doctor: ", error);
        }
    }

    return(
        <>
            <fieldset className="form need-validation" ref={form}>
                <h1>Create New Item in Dashboard</h1>
                <Inputs value={name} ref={iName} name="name" placeholder='Insert Name'              onChange={handleChange(setName)} />
                <Inputs value={spec} ref={iSpec} name="spec" placeholder='Insert Specializations'   onChange={handleChange(setSpec)} />
                <Inputs value={days} ref={iDays} name="days" placeholder='Insert Days Available'    onChange={handleChange(setDays)} />
                <Inputs value={avai} ref={iAvai} name="avai" placeholder='Insert Availability'      onChange={handleChange(setAvai)} />
                <button className='btn btn-primary mb-3'                                onClick={()=> handleSubmit()}>Submit</button>
            </fieldset>
        </>
    )
}