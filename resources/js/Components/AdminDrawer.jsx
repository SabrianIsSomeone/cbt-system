import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/logo.png"
import ApplicationLogo from "./ApplicationLogo";
import NavLinkDashboard from "./NavLinkDashboard";
import { CiViewTimeline } from "react-icons/ci";
import { GrOverview } from "react-icons/gr";

const AdminDrawer = () => {
  return (
    <div className="shadow-2xl drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="w-64 min-h-full p-4 text-opacity-75 menu bg-gradient-to-b from-slate-950 to bg-orange-950 text-slate-100 ">

        {/* Sidebar content here */}
        <div className="flex justify-center"><img src={logo} className="w-24 h-24 m-3 text-primary/70" />
        </div>

        {/* <ApplicationLogo className="mx-16 " /> */}
        <div className="mt-4 mb-2 border-b-2 border-yellow-600" />


        <NavLinkDashboard href={route('admin.dashboard')} active={route().current('admin.dashboard')}><MdSpaceDashboard />
          Dashboard
        </NavLinkDashboard>

        <NavLinkDashboard href={route('admin.subject')} active={route().current('admin.subject')}><FaNotesMedical />
          Soal
        </NavLinkDashboard>


        <NavLinkDashboard href={route('admin.peserta')} active={route().current('admin.peserta')}><MdSwitchAccount />
          Peserta
        </NavLinkDashboard>

        <NavLinkDashboard href={route('admin.overview')} active={route().current('admin.overview')}><GrOverview />
          Nilai Peserta
        </NavLinkDashboard>

      </ul>

    </div>
  )
}

export default AdminDrawer
