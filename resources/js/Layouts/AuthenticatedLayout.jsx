import Footer from "@/Components/Footer";
import { Navbar, Sidebar } from "@/Components";

export default function Authenticated({
    user,
    header,
    title,
    children,
    current,
    data,
    isExam,
}) {
    return (
        <div className="w-full h-full">
            <div className="h-full drawer tablet:drawer-open">
                {header && (
                    <header className="bg-white shadow">
                        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <div className="flex flex-col h-full drawer-content bg-neutral">
                    <Navbar user={user} title={title} />
                    <div className="h-full mx-6 mt-6 bg-white">
                        <main>{children}</main>
                    </div>
                    {/* NOTE: Aku tambahain footer simpel yg nampilin kapan terakhir diubah */}
                    <footer className="h-20">
                        <div className="h-2 border-t-2 border-base" />
                        <a className="block m-3 text-slate-400 font-extralight">Created at 2024; updated at October 2024; &#169; TryOutOnline</a>
                    </footer>
                </div>
                <Sidebar
                    active={current ? current : route().current("dashbard")}
                    user={user}
                ></Sidebar>
            </div>
            {/* NOTE: Footer ny dk usah be ato dijadiin footer yg di dalam konten*/}
            {/* {isExam ? "" : <Footer subject={data} />} */}
        </div>
    );
}
