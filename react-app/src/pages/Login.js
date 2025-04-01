import {useState} from 'react';
import Inputs from '../components/Inputs';


function Login({returnStatus}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [peekPassword, setPeekPassword] = useState(false);
//   const [isPositive, setStatus] = useState(false);

  const hardUsername = 'root';
  const hardassword = 'password';

  function handleClicks(){
    const usernameMatch = (username === hardUsername);
    const passwordMatch = (password === hardassword);

    const bothConditionsPassed = usernameMatch && passwordMatch;

    if(bothConditionsPassed){
      return returnStatus (true);
    }
    else {
        return returnStatus (false);
    }
    
  }

  const InputsClassName = "form-control form-control-lg mb-3";

  return (
      <fieldset className='form mb-3'>
        <h1>User login</h1>
        <Inputs
          className={InputsClassName}
          types="text" 
          name="username" 
          placeholder="username" 
          value={username} 
          onChange={(e)=> setUsername(e.target.value)}
        />
        <span>
            <Inputs 
            className={InputsClassName}
            types={peekPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            />
            <button type='button' onClick={()=>setPeekPassword(s => !s)}> {peekPassword ? "hide" : "show"}  </button>
        </span>
        <Inputs types="submit" name="submit" onClick={()=>handleClicks()}/>
    </fieldset>

  );
}

export default Login;
