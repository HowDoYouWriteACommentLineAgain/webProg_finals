import React, {useState, useEffect, useCallback } from 'react';
import Inputs from '../components/Inputs';

export default function EditDashboard(){
    const [list, setList] = useState('');
    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [days, setDays] = useState('');
    const [nurs, setNurs] = useState('');
    const [avai, setAvai] = useState('');

    

    return(
        <>
            <fieldset className="form need-validation">
                <h1>Edit Dashboard</h1>
                <Inputs value={name} name="name" placeholder='Insert Name' onChange={(e)=>setName(e.target.value)} />
                <Inputs value={spec} name="spec" placeholder='Insert Specializations' onChange={(e)=>setSpec(e.target.value)} />
                <Inputs value={days} name="days" placeholder='Insert Days Available' onChange={(e)=>setDays(e.target.value)} />
                <Inputs value={nurs} name="nurs" placeholder='Insert Nurses assigned' onChange={(e)=>setNurs(e.target.value)} />
                <Inputs value={avai} name="avai" placeholder='Insert Availability' onChange={(e)=>setAvai(e.target.value)} />
                <button className='btn btn-primary'>Submit</button>
            </fieldset>
        </>
    )
}