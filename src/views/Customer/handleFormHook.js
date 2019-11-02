import React, {useState, useEffect} from "react";

const HandleFormHook = (callback, validate) => {
  const [inputs, setInputs] = useState({});
  
  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };
  
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};
export default HandleFormHook;