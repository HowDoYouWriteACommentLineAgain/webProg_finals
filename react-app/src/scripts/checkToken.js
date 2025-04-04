  const checkToken = async () =>{
    try{
        const token = localStorage.getItem('token');
        if(!token) return false;

        const res = await fetch('http://localhost:5000/checkTokenValidity', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        });

        if (res.status !== 200){
            localStorage.removeItem('token');
            console.log('token removed');
            return false;
        }

        return true;
    }catch(err){
        console.error('Error in checkToken', err);
        return false;
    }
  }

  export default checkToken;