import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/logo.png';

const Navbar: React.FC = () => {
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isNestedDropdownOpen, setNestedDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <nav className="">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <img src={logo} />
        </div>
        <ul className="flex space-x-6 text-gray-800">
          <li>
            <NavLink to="/" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
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
            {isMegaMenuOpen && (
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
            )}
          </li>
          <li>
            <NavLink to="/user-recpie" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
              RECIPE
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
              CONTACT US
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="hover:text-green-500 text-sm font-semibold text-[#474747]">
              SIGN UP
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
