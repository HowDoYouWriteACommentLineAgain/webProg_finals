import React, {useState, useEffect} from 'react';

export default function FetchUsers({list, setList, url}){

    useEffect(()=>{
        fetch(`http://localhost:5000/${url}`)
            .then(res => res.json())
            .then(data => setList(data));
    }, []);

    const handleDelete = async (id) =>{

        await fetch(`http://localhost:5000/${url}/${id}`,{method: "DELETE"});
        setList(list.filter(item => item._id !== id));
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    { list[0] && Object.keys(list[0]).map(jsonKey => (jsonKey !== '_id' && jsonKey !== 'password' && jsonKey !== '__v' && <th key={jsonKey}>{jsonKey}</th>))}
                </tr>
            </thead>
            <tbody>
                {list.map( listItem => (
                    <tr key={listItem._id}> 
                        {
                            Object.keys(listItem).map(jsonKey => (jsonKey !== '_id' && jsonKey !== 'password' && jsonKey !== '__v' && (<td key={jsonKey}>{listItem[jsonKey]}</td>)))
                        }

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