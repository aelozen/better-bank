// export const capitalize = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// };

export const capitalize = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return ""; // Return an empty string if the input is not a valid string
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  