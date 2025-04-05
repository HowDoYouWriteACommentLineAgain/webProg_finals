import { Outlet, Link} from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';

const Layout = ({loginStatus, user}) => {
    
    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
            <span className="container-fluid pe-5">
                <span className="navbar-brand col-2 text-white px-3">Welcome | Status: {(loginStatus) ? 'logged in' : 'logged out'}</span>
                {/* <span className="nav-item  col-5">Connected East Avenue Medical Center | status: {loginStatus || 'Please login'}</span> */}

                <span className="navbar-nav d-flex" id="collapseNavItems">
                    {/*login*/!loginStatus && <div className="nav-item"><Link className="nav-link text-white" to="/login">                  <i class="bi bi-file-person fs-2"></i></Link></div>}
                    {/*logout*/loginStatus && <div className="nav-item"><Link className="nav-link mx-2 text-white" to="/logout"><button className='btn btn-danger fs-6 mt-2'>logout</button></Link></div>}
                    {/*RUD*/                } <div className="nav-item"><Link className="nav-link text-white" to="/dashboard">              <i class="bi bi-file-ruled fs-2 ms-3"></i></Link></div>
                    {/*Create*/loginStatus && <div className="nav-item"><Link className="nav-item nav-link text-white" to="/addDashboard">  <i class="bi bi-file-earmark-plus fs-2 ms-3"></i></Link></div>}
                    {/* <Link className="nav-item nav-link text-white" to="/usersCrud">Config Users</Link> */}
                    
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
