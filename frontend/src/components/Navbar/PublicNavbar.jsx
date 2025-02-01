import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiUserAddLine } from "react-icons/ri";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaPiggyBank } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
               <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <FaPiggyBank className="h-8 w-auto text-white" />
                  
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center text-white text-lg font-semibold hover:text-teal-200"
                  >
                    SmartFinance
                  </Link>
                </div>
              </div> 
              <div className="flex items-center space-x-4">
                <Link
                  to="/register"
                  className="relative inline-flex items-center gap-x-2 rounded-full bg-pink-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <RiUserAddLine className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Register
                </Link>
                <Link
                  to="/login"
                  className="relative inline-flex items-center gap-x-2 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <RiLoginCircleLine className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-300 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  SmartFinance
                </Disclosure.Button>
              </Link>

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-300 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-300 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
