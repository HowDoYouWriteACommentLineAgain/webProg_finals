import { Outlet, Link,  useNavigate, useLocation } from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';
import { useEffect } from "react";

const Layout = ({loginStatus, currentUser}) => {
    const navigateTo = useNavigate();
    const currentLocation = useLocation();

    // useEffect(()=>{
    //     if(loginStatus === false){
    //         navigateTo('/login', {replace:true});
    //     }
    // },[currentLocation.pathname, loginStatus, navigateTo]);


    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
        <span className="container-fluid pe-5">

            <span className="navbar-brand col-2 text-white px-3">Welcome: {currentUser || '???'}</span>

            <span className="nav-item  col-5">Connected From: East Avenue Medical Center | Terminal Sesson:1 | status: {loginStatus}</span>

            <span className="navbar-nav col-4" id="collapseNavItems">
                <Link className="nav-item nav-link text-white" to="/login">User Login</Link>
                <Link className="nav-item nav-link text-white" to="/dashboard">Dashboard</Link>
                <Link className="nav-item nav-link text-white" to="/usersCrud">Crud</Link>
                <Link className="nav-item nav-link text-white" to="/addDashboard">Add Dashboard</Link>

            </span>
                {/* 
                    TODO: Eventually remove Crud here and instead have Router rerout to appropriate page
                    Make Login a modal pop-up
                
                */}
        </span>

        </nav>

        <div className="card" style={card}>
            <div className="card-body">
                {/* <h1 className="card-title"></h1> */}
                <Outlet />
            </div>
        </div>
    </>
    )
}

export default Layout;
