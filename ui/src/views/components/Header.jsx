import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  UserIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { clearStorage, getFromStorage } from "../../services";
import { Link, useNavigate } from "react-router-dom";

const MenuLinks = [
  {
    name: "My Blog",
    href: "/my-blogs",
    icon: UserIcon,
    private: true,
  },
  {
    name: "Write An Blog",
    href: "/create",
    icon: PencilIcon,
    private: true,
  },
];

const Header = () => {
  const isAuth = getFromStorage("isAuth", true);
  const navigate = useNavigate();
  const user = isAuth ? getFromStorage("user", true) : null;

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to={"/"}>
              <h2 className="text-2xl font-mono">Archee/Anjali-blog</h2>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link
              key={"home"}
              to={"/"}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            {isAuth &&
              MenuLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
          </Popover.Group>
          {!isAuth && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
          {isAuth && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <p
                onClick={() => {
                  clearStorage();
                  navigate(0);
                }}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              >
                Log Out
              </p>
            </div>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl">Archee/Anjali-blog</h2>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link
                    key={"home"}
                    to={"/"}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <HomeIcon
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Home
                    </span>
                  </Link>
                  {MenuLinks.map((link) => {
                    if (link.private && !isAuth) {
                      return;
                    }
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <link.icon
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            {!isAuth && (
              <div className="py-6 px-5 space-y-6">
                <div>
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {isAuth && (
              <div className="py-6 px-5 space-y-6">
                <div>
                  <p
                    onClick={() => {
                      clearStorage();
                      navigate(0);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                  >
                    Log Out
                  </p>
                </div>
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
