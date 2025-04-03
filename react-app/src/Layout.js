import { Outlet, Link,  useNavigate, useLocation } from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';
import { useEffect, useState } from "react";

const Layout = ({actionOn, setUserAs}) => {
    const navigateTo = useNavigate();
    const currentLocation = useLocation();

    useEffect(()=>{
        if(actionOn === false){
            navigateTo('/login', {replace:true});
        }
    },[currentLocation.pathname]);


    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
        <span className="container-fluid">

            <span className="navbar-brand col-md-3 col-lg-2 text-white px-3">Welcome: {setUserAs || '???'}</span>

            <span className="nav-item">Connected From: East Avenue Medical Center | Terminal Sesson:1 | status: {actionOn ? 'ok' : '???'}</span>

            <span className="navbar-nav col-md-3 col-lg-2" id="collapseNavItems">
                <Link className="nav-item nav-link text-white" to="/login">User Login</Link>
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
