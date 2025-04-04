import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import {colors, primary, elements} from'./styleObjects/customStyles';
import Layout from './Layout';
import ProtectedRoutes from './components/ProtectedRoutes';

import Login from './pages/Login';
import Logout from './pages/Logout';
import UsersCrud from './pages/UsersCrud';
import Dashboard from './pages/Dashboard';
import AddDashboard from "./pages/AddDashboard";
import UpdatePage from "./pages/UpdatePage";
import NotFound from "./pages/NotFound";
import checkToken from "./scripts/checkToken";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(()=>{

    const checkForToken = async () =>{
        const isTokenValid = await checkToken();
        setLoginStatus(isTokenValid);
    }
    checkForToken();

  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout loginStatus={loginStatus}/>}>
          <Route index path='/' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />} />
          <Route path='/login' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />} />
          <Route path="dashboard" element={<Dashboard loginStatus={loginStatus}/>} />
          <Route element={<ProtectedRoutes status={loginStatus}/>}>
            <Route path='logout' element={<Logout setLoginStatus={setLoginStatus} />} />
            <Route path='edit/:id' element={<UpdatePage />} />
            <Route path="usersCrud" element={<UsersCrud />} />
            <Route path="addDashboard" element={<AddDashboard/>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



/* <Login  returnStatus={handleReturnedStatus}/>
<br />
<UsersCrud /> */

/* <section style={elements.center}>
<div className="card">
  <div className="card-body">
  <h1 className="card-title">Currently Viewing:  &lt;F&gt;  Floor</h1>
  </div>
</div>
</section> */