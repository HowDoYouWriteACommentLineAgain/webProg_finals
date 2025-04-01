import React, { useState } from "react";

import {colors, primary, elements} from'./customStyles';
import Login from './Login';
import UsersCrud from './UsersCrud';
import Layout from './Layout';
import Dashboard from './Dashboard';

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleReturnedStatus = (status) =>{
    setLoginStatus(status);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login/>} />
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