import React, { useContext, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoutes from './components/ProtectedRoutes';

import Login from './pages/Login';
import UsersCrud from './pages/UsersCrud';
import Dashboard from './pages/Dashboard';
import AddDashboard from "./pages/AddDashboard";
import NotFound from "./pages/NotFound";
import AuthProvider, { AuthContext } from "./components/AuthContext";


function App() {

  const { loginStatus, setLoginStatus } = useContext(AuthContext); 
  const [currentUser, setCurrentUser] = useState('');
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout loginStatus={loginStatus} currentUser={currentUser}/>}>
            <Route index path='/' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>} />
            <Route path='/login' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route element={<ProtectedRoutes defaulfPaths='/'/>}>
              <Route path="usersCrud" element={<UsersCrud />} />
              <Route path="addDashboard" element={<AddDashboard/>} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
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
