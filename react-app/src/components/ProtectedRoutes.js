import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRoutes = ({path, user}) => {
    const recievedUser = user ?? null;
    const defaultPath = path ?? "/"
    return recievedUser ? <Outlet /> : <Navigate to={path} replace={true} />
}

export default ProtectedRoutes;