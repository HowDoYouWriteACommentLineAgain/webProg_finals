import { Outlet, Link } from "react-router-dom";
import {primary, card} from'./styleObjects/customStyles';

const Layout = () => {
    return(
        <>
        <nav className='navbar navbar-expand-lg bg-body-indigo text-white' style={primary}>
        <span className="container-fluid">

            <span className="navbar-brand col-md-3 col-lg-2 text-white px-3">Welcome: User</span>

            <span class="nav-item">DD/MM/YYYY | AM/PM HH:MM</span>

            <span className="navbar-nav col-md-3 col-lg-2" id="collapseNavItems">
                <Link className="nav-item nav-link" to="/">User Login</Link>
                <Link className="nav-item nav-link" to="/usersCrud">Crud</Link>
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
