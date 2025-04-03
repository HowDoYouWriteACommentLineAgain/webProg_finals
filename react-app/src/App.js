import React, { useState } from "react";

import {colors, primary, elements} from'./styleObjects/customStyles';
import Login from './pages/Login';
import UsersCrud from './pages/UsersCrud';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  const [loginStatus, setLoginStatus] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const handleReturnedStatus = (status) =>{
    setLoginStatus(status);
    console.log(`current status: ${status}`);
    // alert('app has recieved status from login component')
  }

  const handleReturnedUser = (user) =>{
    setCurrentUser(user);
    console.log(`current user: ${user}`);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout actionOn={loginStatus} setUserAs={currentUser}/>}>
          <Route index element={<Login returnStatus={handleReturnedStatus} userUsername={handleReturnedUser}/>} />
          <Route path="usersCrud" element={<UsersCrud />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{/* <Login  returnStatus={handleReturnedStatus}/>
<br />
<UsersCrud /> */}

{/* <section style={elements.center}>
<div className="card">
  <div className="card-body">
  <h1 className="card-title">Currently Viewing:  &lt;F&gt;  Floor</h1>
  </div>
</div>
</section> */}