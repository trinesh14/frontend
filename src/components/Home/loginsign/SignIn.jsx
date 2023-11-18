import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  let history = useNavigate();
  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { email, password } = state;

    // alert(`You are login with email: ${email} and password: ${password}`);
   
    var crypt = {
      secret: "CIPHERKEY",
      encrypt: val => {
          var cipher = CryptoJS.AES.encrypt(val, crypt.secret);
          return cipher.toString();
      },

      decrypt: cipher => {
          var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
          return decipher.toString(CryptoJS.enc.Utf8);
      }
      
  }
  var passwordecrypt = crypt.encrypt(password)
  const postData = {
    email,
    passwordecrypt
  };

  try {
    // Make the Axios POST request
    // const response = await axios.post('/api/user/register', postData);
    const response = await axios.post('https://nodeserver-production-3271.up.railway.app/api/user/login', postData);
    // Handle the response as needed (e.g., show a success message)
    alert(response.data.message)
    if (response.data.success) {
      // Redirect to the other page upon successful login
      // eslint-disable-next-line no-restricted-globals
      
      localStorage.setItem('user', JSON.stringify(response.data.data));
      history('/');
      window.location.reload();
    }
   
  } catch (error) {
  
    // Handle errors (e.g., show an error message)
    console.error('Error:', error);
    alert(error.response.data.message)
  }
 

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <>
    <div className="form-container sign-in-container">
    <form onSubmit={handleOnSubmit}>
      <h1>Sign in</h1>
      <div className="social-container">
        <a className="social">
          <i className="fab fa-google-plus-g" />
        </a>
      </div>
      <span>or use your account</span>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      />
      <a>Forgot your password?</a>
      <button className="m-5px">Sign In</button>
    </form>
  </div>
    </>

  );
}

export default SignInForm;
