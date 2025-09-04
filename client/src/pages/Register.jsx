import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const initialFormData = {
    name: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    isSeller: false,
    };

    const navigate= useNavigate();
   const [formData, setFormData] = useState(initialFormData);
   const [redirecting, setRedirecting] = useState(false);
    const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

   const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailId)) {
      setError("Please enter a valid email address");
      return;
    }

   if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
   

     const fullAddress = `${formData.address}\n${formData.city}, ${formData.state}, ${formData.zipcode}`;
      const { confirmPassword,city, zipcode, state, ...rest } = formData;
    const dataToSend = {
      ...rest,
      address: fullAddress, // replace plain address with concatenated one
    };



     try {
    const res = await axios.post('http://localhost:8000/user/register', dataToSend);
    console.log('Registration successful:', res.data);

    setFormData(initialFormData);
    setRedirecting(true);
    setTimeout(() => {
        navigate("/login");
      }, 1500);
    } 
  catch (err) {
    if (err.response) {
      setError(err.response.data.error || 'Registration failed');
    } else {
      setError('Server not reachable');
    }
  }
  };


    if (redirecting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">
          ✅ Registration successful! Redirecting to login...
        </p>
      </div>
    );
  }

  
  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
           {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 text-left">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="emailId" className="block text-sm font-medium text-gray-800 text-left">
              emailId address
            </label>
            <input
              type="emailId"
              name="emailId"
              id="emailId"
              autoComplete="emailId"
              value={formData.emailId}
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 text-left">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-800 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-800 text-left">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Row for City, Zipcode, State */}
          <div className="flex space-x-3">
            <div className="flex-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-800 text-left">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="w-24">
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-800 text-left">
                Zipcode
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="w-24">
              <label htmlFor="state" className="block text-sm font-medium text-gray-800 text-left">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-sm border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Checkbox for Customer or Seller */}
          <div className="flex items-center space-x-2">
            <input
              id="isSeller"
              name="isSeller"
              type="checkbox"
              checked={formData.isSeller}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="isSeller" className="text-sm font-medium text-gray-800">
              Register as Seller
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-sm bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-sm font-semibold text-black shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-blue-700 hover:underline font-semibold">
            Login to your Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
