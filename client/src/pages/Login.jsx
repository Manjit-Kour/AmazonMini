import { Link} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login=()=>{

  const initialFormData={
    emailId: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  // Update state when typing
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:8000/user/login', formData);
        //stores the jwt token 
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert('Login successful!');

        //set the login fields empty
        setFormData(initialFormData);

        //redirect to home
        navigate('/');

      } catch (err) {
        if (err.response) {
          console.error('Error response:', err.response.data);
          alert(err.response.data.error || 'Login failed');
        } else {
          console.error('Error:', err.message);
          alert('Server not reachable');
        }
      }
    };

    return (
    <div className="mt-10 mx-auto w-full max-w-sm">
  <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
    <form className="space-y-6" method="POST"  onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="emailId" className="block text-sm font-medium text-gray-800 text-left">
          email address
        </label>
        <input
          type="emailId"
          name="emailId"
          id="emailId"
          autoComplete="emailId"
          required
          value={formData.emailId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800 text-left">
            Password
          </label>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center rounded-sm bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-sm font-semibold text-black shadow-sm"
       >
          Sign in
        </button>
      </div>
    </form>

    <p className="mt-6 text-center text-sm text-gray-600">
      New to Amazon?{' '}
      <Link to="/register" className="text-blue-700 hover:underline font-semibold">
        Create your account
      </Link>
    </p>
  </div>
</div>

    )
}
export default Login;