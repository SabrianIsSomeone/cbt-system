import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import Dropdown from "./Dropdown";
import ResponsiveNavLink from "./ResponsiveNavLink";
import ExamRanger from "./../../assets/ExamRanger.svg"
import pp from "./../../assets/profile.png";
import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";

const Navbar = ({user}) => {
    let admin = false
    let name = 'a'
    let loggedIn = false
    if (user) {
      name = user.email
      loggedIn = true
    }

    if (name == 'admin@admin.com') {
      admin = true
    }
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    return (
        <nav className="border-b border-gray-300 gradient-white-base">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                    <div className="flex items-center shrink-0">
                        <Link href="/">
                            <ApplicationLogo className="block text-gray-800 fill-current" />
                        </Link>
                    </div>

                    <div className="my-auto">
                        <Link href={route('home')} >
                            <img src={ExamRanger} alt="" className="h-8 mx-2"/>
                        </Link>
                    </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:ms-6">
                    <div className="relative ms-3">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">

                                    <button
                                        type="button"
                                        className="flex items-center px-4 py-1 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                    >
                                        <div class="flex items-center justify-start ">
                                        <IoIosNotifications className="w-7 h-7" />
                                            <img src={user.profil_pic ? user.profil_pic : pp} className="mx-3 w-9 h-9 rounded-xl" />
                                            <div class="text-left mr-4">
                                                <p className="font-extrabold text-">{user.name}</p>
                                                <p className="font-medium shrink-0 ">{user.nim}</p>
                                            </div>
                                        </div>

                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {user.is_admin ? <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                : ""}
                                {user.is_admin ?
                                    <Dropdown.Link href={route('admin.dashboard')}>Administrator</Dropdown.Link> : ''}
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                <div className="flex items-center -me-2 sm:hidden">
                    <button
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                        className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                    >
                        <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
            <div className="pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                    Home
                </ResponsiveNavLink>
            </div>

            <div className="pt-4 pb-1 border-t border-gray-200">
                <div className="px-4">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>

                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                        Log Out
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
    </nav>
    );
}

export default Navbar
