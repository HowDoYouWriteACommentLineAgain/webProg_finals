import React, { useState } from "react";

// import {colors, primary, elements} from'./styleObjects/customStyles';
import Login from './pages/Login';
import UsersCrud from './pages/UsersCrud';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddDashboard from "./pages/AddDashboard";



function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout loginStatus={loginStatus} currentUser={currentUser}/>}>
          <Route index path='/login' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>} />
          <Route path="usersCrud" element={<UsersCrud />} />
          <Route path="dashboard" element={<Dashboard status={loginStatus}/>} />
          <Route path="addDashboard" element={<AddDashboard status={loginStatus}/>} />
          {/* TODO PROTECTED ROUTES COMPONENT */}
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