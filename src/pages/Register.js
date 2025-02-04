// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hashKey, setHashKey] = useState('abc'); // Assuming 'abc' is the default hash key
  const [type, setType] = useState('customer');
  const [annualIncome, setAnnualIncome] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setHashKey("abc")
    setType("customer")
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        password,
        hashKey,
        type,
        user_info: {
          annual_income: parseFloat(annualIncome),
          gender,
          name,
          address,
          phone: parseInt(phone),
        },
      });

      console.log(response.data); // handle success (response from server)
      setSuccessMessage('Registration successful! Redirecting to the home page...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <form>
        <h1>Register</h1>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {/* Add more input fields for other registration details */}
        {/* ... */}
        <label>
          AnnualIncome:
          <input type="text" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} />
        </label>
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Register;
