import { Outlet, Link} from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';

const Layout = ({loginStatus}) => {
    
    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
            <span className="container-fluid pe-5">
                <span className="navbar-brand col-2 text-white px-3">Welcome | Status {(loginStatus) ? 'logged in' : 'logged out'}</span>
                {/* <span className="nav-item  col-5">Connected East Avenue Medical Center | status: {loginStatus || 'Please login'}</span> */}

                <span className="navbar-nav d-flex" id="collapseNavItems">
                    {!loginStatus && <div className="nav-item"><Link className="nav-link text-white" to="/login">User Login</Link></div>}
                    {loginStatus && <div className="nav-item"><Link className="nav-link text-white" to="/logout">Logout</Link></div>}
                    
                    <div className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></div>
                    <Link className="nav-item nav-link text-white" to="/addDashboard">Create</Link>
                    <Link className="nav-item nav-link text-white" to="/usersCrud">Config Users</Link>
                    
                </span>
                    {/* 
                        TODO: Eventually remove Crud here and instead have Router rerout to appropriate page
                        Make Login a modal pop-up
                    
                    */}
            </span>
        </nav>
        <div className="card" style={card}>
            <div className="card-body">
                <Outlet />
            </div>
        </div>
    </>
    )
}

export default Layout;
