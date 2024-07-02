import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/logo.png';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { notify } from '../../common/Toast';

const Navbar: React.FC = () => {
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isNestedDropdownOpen, setNestedDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
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
        setTimeout(()=>{
          window.location.href = "/users/fe";

        },2000)
      } else {
        notify('Login successful!', { type: 'error' });
      }
    } catch (error) {
      notify('Error logging in. Please try again.', { type: 'error' });
    }
  };
const[data, setData]= useState<any>()
console.log(data)
  const [formSignUpData, setFormSignUpData] = useState({
    user_name: '',
    email: '',
    password: '',
    role:'user',
    gender:true
  });

  const handleSignUpSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpPopupOpen(false)

       try {
        const response: any = await axios.post(
          'http://localhost:3001/auth/register',
          formSignUpData,
        )
        setData(response.data)
        const userName = response.data.user.user_name;

        console.log('res.data',userName)
        localStorage.setItem('user_name', userName)
        if (response.data && response.data.token) {
          notify(response.data.message, { type: 'success' });
          setTimeout(()=>{
            window.location.href = "/users/fe";
          },2000)
        } else {
          notify('SignUp successful!', { type: 'success' });
        }
      } catch (error) {
        console.error('Error SignUp in:', error);
      }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSignUpData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const user_name = localStorage.getItem('user_name')
 
  return (
    <nav className="">
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
              onClick={() => setPagesDropdownOpen(!isPagesDropdownOpen)}
              className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
            >
              PAGES
            </button>
            {isPagesDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-900 shadow-lg z-1">
                <li>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-200">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Blog Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Recipe Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Contact
                  </NavLink>
                </li>
                <li className="relative group">
                  <button
                    onClick={() => setNestedDropdownOpen(!isNestedDropdownOpen)}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200 focus:outline-none text-sm font-semibold text-[#474747]"
                  >
                    ELEMENTS
                  </button>
                  {isNestedDropdownOpen && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-white text-gray-900 shadow-lg">
                      <li>
                        <NavLink
                          to="#"
                          className="block px-4 py-2 hover:bg-gray-200 text-sm font-semibold text-[#474747]"
                        >
                          DROPDOWN
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li className="relative group">
            <button
              onClick={() => setMegaMenuOpen(!isMegaMenuOpen)}
              className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
            >
              MEGA MENU
            </button>
            {/* {isMegaMenuOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white text-gray-900 shadow-lg">
                <div className="container mx-auto py-4 px-8">
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-semibold mb-2">Category 1</h3>
                      <ul>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 1
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 2
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 3
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Category 2</h3>
                      <ul>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 1
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 2
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 3
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Category 3</h3>
                      <ul>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 1
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 2
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="hover:text-gray-600">
                            Link 3
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </li>
          <li>
            <NavLink
              to="/user-recpie"
              className="hover:text-green-500 text-sm font-semibold text-[#474747]"
            >
              RECIPE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-green-500 text-sm font-semibold text-[#474747]"
            >
              CONTACT US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className="hover:text-green-500 text-sm font-semibold text-[#474747]"
            >
              ABOUT US
            </NavLink>
          </li>
          {/* {!formData &&  */}
          <li className="relative group">
            <button
              onClick={() => setLoginPopupOpen(!isLoginPopupOpen)}
              className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
            >
              LOGIN
            </button>
          </li>
          {/* } */}
          {/* {!formSignUpData && */}
          <li className="relative group">
            <button
              onClick={() => setSignUpPopupOpen(!isSignUpPopupOpen)}
              className="hover:text-green-500 focus:outline-none text-sm font-semibold text-[#474747]"
            >
              SIGN UP
            </button>
          </li>
          {/* } */}
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
                  <span className="block hover:bg-gray-200">{user_name} </span>
                </div>

                <li>
                  <NavLink
                    to="#"
                    className="block hover:bg-gray-200 px-4 py-2 "
                  >
                    SignOut
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* Login popup */}
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
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Login to your account
                  </button>
                  <div className="text-sm font-medium text-gray-500">
                    Not registered?{' '}
                    <a href="#" className="text-green-500 hover:underline ">
                      Create account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign up popup  */}
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
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign Up to your account
                  </button>
                  <div className="text-sm font-medium text-gray-500">
                    Not registered?{' '}
                    <a href="#" className="text-green-500 hover:underline ">
                      Create account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
