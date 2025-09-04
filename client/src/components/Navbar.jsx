import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate=useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <a href="/" className="text-xl font-bold hover:text-yellow-400">
        MiniAmazon.in
      </a>

      {/* Search */}
      <div className="flex flex-1 max-w-lg mx-4">
        <input
          type="text"
          placeholder="Search products"
          className="flex-grow px-2 py-1 rounded-l border border-gray-700 bg-white-800 focus:outline-none"
        />
        <button className="bg-yellow-500 px-3 rounded-r hover:bg-yellow-600">
          Search
        </button>
      </div>

      {/* Links */}
      <div className="flex space-x-4 items-center">
        {user? 
        (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-semibold hover:text-yellow-400"
            >
              Hello, {user.name}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ):
        (<a href="/Login" className="hover:text-yellow-400">
          Sign In
        </a>)
        }
        <a href="/Cart" className="flex items-center space-x-1 hover:text-yellow-400">
          <FaShoppingCart />
          <span>Cart</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
