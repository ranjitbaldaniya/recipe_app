import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/logo.png';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { notify } from '../../common/Toast';

const Navbar: React.FC = () => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true)
  const [userName,setUserName]=useState();
  const [formSignUpData, setFormSignUpData] = useState({
    user_name: '',
    email: '',
    password: '',
    role: 'user',
    gender: true
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
const user_name= localStorage.getItem('user_name')
 const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    setLoginPopupOpen(false);


    try {
      const response: any = await axios.post('http://localhost:3001/auth/login', formData);
      if (response.data && response.data.token) {
        notify(response.data.message, { type: 'success' });
        localStorage.setItem('user_name', response.data.user.user_name)
        setUserName(response.data.user.user_name)
        setShowLogin(false)
      }
    } catch (error) {
      notify('Error logging in. Please try again.', { type: 'error' });
    }
  };

  const handleSignOut = () => {
    setShowLogin(true)
    localStorage.removeItem('user_name')
    setProfileOpen(false)
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpPopupOpen(false)

    try {
      const response: any = await axios.post(
        'http://localhost:3001/auth/register',
        formSignUpData,
      )
      const userName = response.data.user.user_name;
      localStorage.setItem('user_name', userName)
      if (response.data && response.data.token) {
        notify(response.data.message, { type: 'success' });
        setUserName(response.data.user.user_name)
        setShowLogin(false)     
      }
    } catch (error) {
      notify('Error SignUp in:',{type : 'error'});
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSignUpData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <nav>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div>
            <img src={logo} />
          </div>
          <ul className="flex space-x-6 text-gray-800">
            <li>
              <NavLink
                to="/"
                className="hover:text-green-500 text-sm font-semibold text-[#474747]"
              >
                HOME
              </NavLink>
            </li>

            <li className="relative group">
              <button
                onClick={() => setMegaMenuOpen(!isMegaMenuOpen)}
                className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
              >
                RECIPE
              </button>

            </li>
            <li>
              <NavLink
                to="/"
                className="hover:text-green-500 text-sm font-semibold text-[#474747]"
              >
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="hover:text-green-500 text-sm font-semibold text-[#474747]"
              >
                CONTACT US
              </NavLink>
            </li>
            {showLogin &&
              <li className="relative group">
                <button
                  onClick={() => setLoginPopupOpen(!isLoginPopupOpen)}
                  className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
                >
                  LOGIN
                </button>
              </li>}

            {/* profile section */}
            {user_name &&
              <li className="relative group">
                <button
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
                >
                  <FaUserCircle size={25} />
                </button>
                {isProfileOpen && (
                  <ul className="absolute right-0   w-48 bg-white text-gray-900 shadow-lg z-1">
                    <div className="px-4 hover:bg-gray-200 py-3">
                      <span className="block hover:bg-gray-200 text-blue-600 font-bold">{userName} </span>
                    </div>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block hover:bg-gray-200 px-4 py-2 "
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>}
          </ul>
        </div>
        {/* mega menu */}
        {isMegaMenuOpen && (
          <div className="absolute z-10 grid grid-cols-5 w-[97%]  text-sm bg-white">
            <div className="p-4 pb-0  md:pb-4 ">
              <ul className="space-y-4 text-md text-black" >
                <li className=''>
                  About Us
                </li>
                <li>
                  Library
                </li>
                <li>
                  Resources
                </li>
                <li>
                  Pro Version
                </li>
              </ul>
            </div>
            <div className="p-4 pb-0  md:pb-4 ">
              <ul className="space-y-4 text-md text-black">
                <li>
                  Blog
                </li>
                <li>
                  Newsletter
                </li>
                <li>
                  Playground
                </li>
                <li>
                  License
                </li>
              </ul>
            </div>
            <div className="p-4 pb-0  md:pb-4 ">
              <ul className="space-y-4 text-md text-black">
                <li>
                  Contact Us
                </li>
                <li>
                  Support Center
                </li>
                <li>
                  Terms
                </li>
              </ul>
            </div>
            <div className="p-4 pb-0  md:pb-4">
              <ul className="space-y-4 text-md text-black">
                <li>
                  Contact Us
                </li>
                <li>
                  Support Center
                </li>
                <li>
                  Terms
                </li>
              </ul>
            </div>
            <div className="p-4  md:pb-4">
              <ul className="space-y-4 text-md text-black">
                <li>
                  Contact Us
                </li>
                <li>
                  Support Center
                </li>
                <li>
                  Terms
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* Login page */}
        {isLoginPopupOpen && (
          <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Login to our platform
                  </h3>
                  <button
                    onClick={() => setLoginPopupOpen(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        onChange={handleLoginChange}
                        value={formData.email}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                        autoComplete='off'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your password
                      </label>
                      <input
                        onChange={handleLoginChange}
                        value={formData.password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        required
                        autoComplete='off'
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
                            required
                          />
                        </div>
                        <label
                          htmlFor="remember"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-green-500 hover:underline "
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                      Not registered?
                      <a href="#" className="text-green-500 hover:underline pr-2 " onClick={() => setSignUpPopupOpen(true)}>
                        Register here
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
          {/* sign up page */}
        {isSignUpPopupOpen && (
          <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Sign Up to our platform
                  </h3>
                  <button
                    onClick={() => setSignUpPopupOpen(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleSignUpSubmit} action="#">
                    <div>
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        name="user_name"
                        id="user_name"
                        value={formSignUpData.user_name}
                        onChange={handleSignUpChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        required
                        autoComplete='off'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formSignUpData.email}
                        onChange={handleSignUpChange}
                        placeholder="Enter your email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        value={formSignUpData.password}
                        onChange={handleSignUpChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        required
                        autoComplete='off'
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
                            required
                          />
                        </div>
                        <label
                          htmlFor="remember"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-green-500 hover:underline "
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign Up to your account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
