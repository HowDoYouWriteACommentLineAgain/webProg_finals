import {Outlet, Navigate} from 'react-router-dom';
// import checkToken from '../scripts/checkToken';

const ProtectedRoutes = ({path, status}) => {
    const recievedStatus = status ?? null;
    const defaultPath = path ?? "/";
    return (recievedStatus === true) ? <Outlet /> : <Navigate to={defaultPath} replace={true} />
}

export default ProtectedRoutes;