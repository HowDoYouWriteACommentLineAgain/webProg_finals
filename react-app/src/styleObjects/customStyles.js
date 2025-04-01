const colors = {
  primary: "#1e4d6b",   // Dark Blue
  secondary: "#4d88b1", // Light Blue
  accent: "#f5a623",    // Warm Yellow
  background: "#f9f9f9", // Soft Light Grey
  text: "#333333",      // Dark Grey
  textLight:"#fff",     // Light Text for dark backgrounds
  border: "#d1d1d1",    // Light Grey
  error: "#e74c3c",     // Red
  success: "#2ecc71"    // Green
};

const elements = {
  center:{
    width:"80%",
    margin:".5em auto .5em auto",
  },
  txtAlignCenter:{
    textAlign:"center"
  }
}

const card = {
    width:"60%",
    margin:".5em auto .5em auto",
    textAlign:"center"
}



const primary = {backgroundColor:colors.primary, color:colors.textLight}

const textLight = {color:colors.textLight};
  
export {colors, elements, primary, textLight, card};