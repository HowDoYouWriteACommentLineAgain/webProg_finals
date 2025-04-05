import {useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import Inputs from '../components/Inputs';


function Login({setLoginStatus}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [peekPassword, setPeekPassword] = useState(false);

  const form = useRef(null);
  const uInput = useRef(null);
  const pInput = useRef(null);

  const navigateOut = useNavigate();

  function handleClicks(){
    form.current.classList.add('was-validated');
    if (!username || !password) return;

    form.current.classList.remove('was-validated');
    checkDatabase();
  }

  const handleChange = (stateSetter) => e => {
    const content = e.target.value;
    e.target.classList.remove('is-invalid');
    stateSetter( content);
    
  }

  async function checkDatabase(){
    try{
      const res = await fetch("http://localhost:5000/Users/authenticate",{                
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({username: username, password: password})
      })
  
      if (!res.ok) {
        const errorText = await res.text(); // Get error details
        alert(errorText); // Show user-friendly alert
        throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
      }
  
      const data = await res.json();
  
      if(data.success === true){
        uInput.current.classList.remove('is-invalid');
        uInput.current.classList.remove('is-invalid');
        setLoginStatus(true);
        localStorage.setItem('token', data.token);
        navigateOut('/dashboard', {replace:true});
      } else{
        
        setLoginStatus(false);
        uInput.current.classList.add('is-invalid');
        pInput.current.classList.add('is-invalid');
        
      }
      console.log( `acknowledged: ${data.message} ${data.success}`);
  
    }catch(err){
      console.error("Error: ", err);
    }
  }

  return (
      <fieldset className='form mb-3 need-validation' ref={form}>
        <h1>User login</h1>
        <Inputs
          className="form-control form-control-lg mb-3"
          types="text" 
          name="username" 
          placeholder="username" 
          value={username} 
          onChange={handleChange(setUsername)}
          isRequired={true}
          id = "usernameInput"
          ref = {uInput}
        />
        <span className=''></span>
        <span className='input-group'>

            <Inputs 
            className="form-control form-control-lg mb-3 col-6"
            types={peekPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={handleChange(setPassword)}
            isRequired={true}
            id = "passwordInput"
            ref = {pInput}
            />

            <button 
              className="btn btn-dark input-group-addon col-1 mb-3" 
              type='button' 
              onClick={()=>setPeekPassword(prev => !prev)}
            > 
              {peekPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
            </button>
        </span>
        <button types="submit" className="btn btn-primary col-11" name="submit" onClick={()=>handleClicks()}>Submit</button>
    </fieldset>

  );
}

export default Login;


