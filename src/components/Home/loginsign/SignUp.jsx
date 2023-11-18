import React from "react";
import axios from 'axios';

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

  const handleOnSubmit = async evt => {
    evt.preventDefault();
   
    const { name, email, password } = state;
    console.log(name, email, password )
    const trimmedName = name.trim();
    const spaceIndex = trimmedName.indexOf(' ');

    const first_name = spaceIndex !== -1 ? trimmedName.substring(0, spaceIndex) : trimmedName;
    const last_name = spaceIndex !== -1 ? trimmedName.substring(spaceIndex + 1) : '';
  // Prepare the data for the POST request
  const postData = {
    email,
    first_name,
    last_name,
    password,
  };

  try {
    // Make the Axios POST request
    // const response = await axios.post('/api/user/register', postData);
    const response = await axios.post('https://nodeserver-production-3271.up.railway.app/api/user/register', postData);
    // Handle the response as needed (e.g., show a success message)
    alert(response.data.message)
    console.log('Response:', response.data.message);
   
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="ls-16">Create Account</h1>
        <div className="social-container">
          <a className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        required/>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        required/>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        required/>
        <button className="m-5px">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
