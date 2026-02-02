import { useState } from "react";
import {
    MdAdminPanelSettings,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdSpaceDashboard,
    MdSwitchAccount,
} from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import pp from "./../../assets/profile.png";
import { NavLinkCollapse, NavLinkDashboard } from ".";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Sidebar = ({ active, user }) => {
    // State untuk mengontrol apakah sidebar collapsed
    const [collapsed, setCollapsed] = useState(false);

    // Function untuk toggle collapse state
    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            className={`drawer lg:drawer-open border-r-2 border-primary/25 ${
                collapsed ? "w-20" : "w-80"
            }`}
        >
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col items-center justify-center drawer-content">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <ul
                    className={`min-h-full p-4 menu bg-gradient-to-b from-base-100/10 via-base-200/15 to-base-300/5  ${
                        collapsed ? "w-20" : "w-80"
                    }`}
                >
                    {/* Sidebar content here */}
                    <div className="flex items-center justify-between m-1">
                        <div>
                            {collapsed && (
                                <div className="flex items-center justify-center w-20 mb-2">
                                    <MdKeyboardDoubleArrowRight
                                        onClick={handleToggle}
                                        className="-ml-5 cursor-pointer w-9 h-9 fill-primary hover:fill-base-100"
                                    />
                                </div>
                            )}
                            <div className="flex items-center">
                                <img
                                    src={user.profil_pic ? user.profil_pic : pp}
                                    className={`${
                                        collapsed ? "w-8 h-8" : "w-10 h-10"
                                    }  mx-3 rounded-xl`}
                                />
                                {!collapsed && (
                                    <div className="mr-4 text-left">
                                        <p className="font-extrabold">
                                            {user.name}
                                        </p>
                                        <p className="font-medium shrink-0">
                                            {user.nim}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!collapsed && (
                            <MdKeyboardDoubleArrowLeft
                                onClick={handleToggle}
                                className="cursor-pointer w-7 h-7 hover:fill-primary"
                            />
                        )}

                        {/* <MdKeyboardDoubleArrowRight
                            onClick={handleToggle}
                            className="w-5 h-5 cursor-pointer hover:fill-primary"
                        /> */}
                    </div>
                    <div className={`my-3 border-b-2 border-black ${collapsed ? 'w-14' : ''}`} />

                    <NavLinkDashboard href={route("home")} active={true}>
                        <MdSpaceDashboard className="w-6 h-6" />
                        {!collapsed && <span className="ml-2">Dashboard</span>}
                    </NavLinkDashboard>

                    <NavLinkCollapse

                        submenu={[
                            "POLRI",
                            "TNI",
                            "KEDINASAN",
                            "TES CPNS",
                            "UTBK SBMPTN",
                            "TES BUMN",
                        ]}
                        routes={[
                            "subcategory",
                            "home",
                            "home",
                            "home",
                            "home",
                            "home",
                        ]}
                    >
                        <FaNotesMedical className="w-6 h-6" />
                        {!collapsed && (
                            <span className="ml-2 text-base font-extrabold">
                                Pilih Try Out
                            </span>
                        )}
                    </NavLinkCollapse>

                    <NavLinkDashboard href={route("exam.history")} >
                        <MdSwitchAccount className="w-6 h-6" />
                        {!collapsed && (
                            <span className="ml-2">Riwayat TryOut</span>
                        )}
                    </NavLinkDashboard>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
