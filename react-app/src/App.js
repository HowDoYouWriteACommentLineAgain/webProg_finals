import './App.css';
import Login from './Login';
import UsersCrud from './UsersCrud';
import { useEffect, useState } from "react";


function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleReturnedStatus = (status) =>{
    setLoginStatus(status);
  }

  // useEffect(()=>{
  //   console.clear();
  //   console.table(loginStatus);
  // },[loginStatus]);

  return (
    <>
      <Login  returnStatus={handleReturnedStatus}/>
      <br />
      <UsersCrud />
    </>
  );
}

export default App;
