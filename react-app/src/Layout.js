import { Outlet, Link,  useNavigate } from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';
import { useEffect, useState } from "react";

const Layout = ({actionOn, setUserAs}) => {
    const [status, setStatus] = useState('status');
    const navigateTo = useNavigate();

    useEffect(()=> setStatus(actionOn), [actionOn]);

    useEffect(()=>{
        const token = localStorage.getItem('jwt');
        if (!token){
            navigateTo('/', {replace:true});
        }

        if(status === 'good' || false){
            navigateTo('/dashboard', {replace:true});
        }
    },[status]);

    // const authenticate = async () => {
    //     const token = localStorage.getItem('jwt');
    //     const response = await fetch('/protected', {
    //         method: 'GET',
    //         headers:{
    //             'authorization' : `Bearer: ${token}`
    //         }
    //     });

    //     const data = await response.json();
    // };


    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
        <span className="container-fluid">

            <span className="navbar-brand col-md-3 col-lg-2 text-white px-3">Welcome: {setUserAs || '???'}</span>

            <span class="nav-item">Connected From: East Avenue Medical Center | Terminal Sesson:1 | status: {actionOn || '???'}</span>

            <span className="navbar-nav col-md-3 col-lg-2" id="collapseNavItems">
                <Link className="nav-item nav-link text-white" to="/">User Login</Link>
                <Link className="nav-item nav-link text-white" to="/usersCrud">Crud</Link>
                {/* 
                    TODO: Eventually remove Crud here and instead have Router rerout to appropriate page
                    Make Login a modal pop-up
                
                */}
            </span>
        </span>

        </nav>

        <div className="card" style={card}>
            <div className="card-body">
                <h1 className="card-title"></h1>
                <Outlet />
            </div>
        </div>
    </>
    )
}

export default Layout;
