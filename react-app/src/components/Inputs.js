function Inputs({name, types, placeholder, onClick, onChange, disabled, value, className}){
    console.log(`Rendering ${name}:`, value);
    return(
  
      <input 
        className={className}
        value={value}
        type={types ?? "text"} 
        name={name} 
        placeholder={placeholder} 
        onClick={onClick} 
        onChange={onChange} 
        disabled={disabled}
      />
      
    );
  }

export default Inputs;