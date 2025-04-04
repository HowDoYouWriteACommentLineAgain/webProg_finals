import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import {colors, primary, elements} from'./styleObjects/customStyles';
import Layout from './Layout';
import ProtectedRoutes from './components/ProtectedRoutes';

import Login from './pages/Login';
import UsersCrud from './pages/UsersCrud';
import Dashboard from './pages/Dashboard';
import AddDashboard from "./pages/AddDashboard";
import NotFound from "./pages/NotFound";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // useEffect(()=>{
  //   checkUserToken();
  // },[currLocation, loginStatus]);

  // async function checkUserToken(){
  //   try{
  //     const token = localStorage.getItem('token');
  //     const res = await fetch('http://localhost:5000/AccessProtected',{
  //       method:"GET",
  //       headers:{
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       }
  //     });
  
  //     if(res.status === 200){
  //       setLoginStatus(true);
  //       navigateOut('/dashboard',{replace:true});
  //     }
      
  //     if(res.status === 401){
  //       console.log("invalid token removing");
  //       localStorage.removeItem('token');
  //       setLoginStatus(false);
  //       setCurrentUser('');
  //       navigateOut('/login', {replace:true});
  //     };
  //   }catch(error){
  //     console.error("Error in Login: ", error)
  //   }
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout loginStatus={loginStatus} currentUser={currentUser}/>}>
          <Route index path='/' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>} />
          <Route path='/login' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route element={<ProtectedRoutes user={currentUser}/>}>
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