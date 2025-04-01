function Inputs({name, types, placeholder, onClick, onChange, disabled, value, className, id, isRequired, ref}){
    // console.log(`Rendering ${name}:`, value);
    return(
  
      <input 
        id={id}
        className={className}
        value={value}
        type={types ?? "text"} 
        name={name}
        placeholder={placeholder ?? "Insert input here"} 
        onClick={onClick} 
        onChange={onChange} 
        disabled={disabled ?? false}
        required={isRequired ?? true}
        ref = {ref}
      />
      
    );
  }

export default Inputs;