function Inputs({name, types, placeholder, onClick, onChange, disabled, value}){
    console.log(`Rendering ${name}:`, value);
    return(
  
      <input 
        className="Input" 
        value={value}
        type={types} 
        name={name} 
        placeholder={placeholder} 
        onClick={onClick} 
        onChange={onChange} 
        disabled={disabled}
      />
      
    );
  }

export default Inputs;