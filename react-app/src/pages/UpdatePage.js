import React, {useEffect, useState } from 'react';
import Inputs from '../components/Inputs';
import { useParams } from 'react-router';

export default function AddDashboard(){

    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [days, setDays] = useState('');
    const [avai, setAvai] = useState('');

    const {id} = useParams();

    function handleSubmit(){
        if (!name || !spec || !days || !avai){
            alert('Please populate all inputs');
            return;
        }
        updateUser();
        
    }

    useEffect(()=>{
        async function fetchById(){
            try{
                const res = await fetch(`http://localhost:5000/Doctors/${id}`);
                const data = await res.json();
                console.log({data});

                setName(data.name);
                setSpec(data.specialization);
                setDays(data.days);
                setAvai(data.availability);
            }catch(err){
                console.error("Error in fetchById: ", err);
            }
        }

        fetchById();
    }, []);

    async function updateUser(){
        try{
            const res = await fetch(`http://localhost:5000/Doctors/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({name: name, specialization: spec, days: days, availability: avai})
            })

            if (!res.ok) {
                const errorText = await res.text(); // Get error details
                alert(errorText); // Show user-friendly alert
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }
            
            alert('Item Updated Successfuly');
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