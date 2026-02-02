import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment/min/moment-with-locales";
import no_data from "@/../assets/no_data.svg";
import subject_image from "@/../assets/subject_image.png";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { IoIosArrowDropdown } from "react-icons/io";
import {
    PrimaryButton,
    Sidebar,
    PopUpRule,
    NavLinkDashboard,
    NavLinkCollapse,
} from "@/Components";
import { IoIosPaper } from "react-icons/io";
import { FaNotesMedical } from "react-icons/fa6";

export default function Home({ auth, subjectExam, submitted, flash }) {
    const intoSoal = useRef(null);
    const executeScroll = () =>
        intoSoal.current.scrollIntoView({ behavior: "smooth", block: "start" });
    const anchor = useRef("subject");
    const [date, setDate] = useState(new Date());
    const onChange = () => {
        setDate(date);
    };

    useEffect(() => {
        if (flash.message == "Ujian telah berhasil disubmit!") {
            localStorage.clear();
        }
    });

    useEffect(() => {
        if (flash.message?.substr(0, 12) == "sudahselesai") {
            document.getElementById("modal_sudah_selesai").showModal();
        }
        if (flash.message?.substr(0, 10) == "sudahlewat") {
            document.getElementById("modal_sudah_lewat").showModal();
        }
    }, [flash.message]);

    const CalendarContainer = styled.div`
        /* ~~~ container styles ~~~ */
        @apply max-width: 300px;
        width: 20rem;
        margin: auto;
        margin-top: 20px;
        // background-color: #f97316;
        padding: 6px;
        border-radius: 15px;

        /* ~~~ active day styles ~~~ */
        .react-calendar__tile--range {
            background-color: #f97316;
        }

        /* ~~~ calendar size ~~~ */
        .react-calendar {
            font-size: 0.75rem;
        }
    `;

    const confirmEnter = (id, name, exam_duration) => {
        Swal.fire({
            title: "Anda yakin?",
            text: "Anda tidak bisa menghentikan pengerjaan try out setelah memulai pengerjaan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, saya yakin!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(
                    route("exam.show", {
                        id: id,
                        name: name,
                        exam_duration: exam_duration,
                    })
                );
            }
        });
    };

    moment.locale("id");

    const [openModal, setOpenModal] = useState(false);
    return (
        <AuthenticatedLayout user={auth.user} data={subjectExam}>
            <Head title="Home" />
            {/* <Sidebar> */}

            <section className="flex justify-center mx-5">
                <div className="w-full max-w-screen-lg mx-9 my-7">
                    <div className="w-full  rounded-2xl mb-10 bg-[#FBEDD7] bg-cover shadow-xl  ">
                        <div className="flex items-center justify-center card-body">
                            <p className="text-sm ">Hi, {auth.user.name} !</p>
                            <h2 className="font-semibold texl-xl sm:text-2xl ">
                                Selamat Datang di website Try Out
                            </h2>
                            <div className="flex justify-between">
                                {/* <PrimaryButton onClick={() => {
                                    setOpenModal(true);
                                }}>
                                    Cara Melaksanakan

                                </PrimaryButton> */}
                                <PrimaryButton onClick={executeScroll}>
                                    Mulai Mengerjakan
                                </PrimaryButton>
                                {openModal && (
                                    <PopUpRule
                                        openModal={openModal}
                                        setOpenModal={setOpenModal}
                                        anchor={anchor}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <strong className="w-full text-center">
                        Pilih Try Out yang akan kamu kerjakan!
                    </strong>
                    <section className="mt-3">
                        <div className="border rounded-lg border-base-100">
                            <div className="flex justify-between m-3">
                                <div className="inline-flex gap-2">
                                <IoIosPaper className="w-7 h-7" />
                                <strong>Kecerdasan AKPOL</strong>
                                </div>
                                <IoIosArrowDropdown className="w-6 h-6"/>
                                {/* TODO :Nanti rencana dibikin collapse */}
                            </div>
                            {subjectExam.length ? 
                                subjectExam.map((subject, i) => {
                                    if (subject.exam_dir == "/polri/psikolog/kecerdasan/akpol") {
                                        return <Link href={route('exam.show')} data={{ id: subject.id, name: subject.name, exam_duration: subject.exam_duration }}>
                                            <div className="p-2 border hover:text-primary">{subject.name}</div>
                                        </Link>
                                    }
                                })
                            
                            : ""}
                        </div>
                    </section>
                    <section className="mt-3">
                        <div className="border rounded-lg border-base-100">
                            <div className="flex justify-between m-3">
                                <div className="inline-flex gap-2">
                                <IoIosPaper className="w-7 h-7" />
                                <strong>Kecerdasan BINTARA</strong>
                                </div>
                                <IoIosArrowDropdown className="w-6 h-6"/>
                                {/* TODO :Nanti rencana dibikin collapse */}
                            </div>
                            {subjectExam.length ? 
                                subjectExam.map((subject, i) => {
                                    if (subject.exam_dir == "/polri/psikolog/kecerdasan/bintara") {
                                        return <Link href={route('exam.show')} data={{ id: subject.id, name: subject.name, exam_duration: subject.exam_duration }}>
                                            <div className="p-2 border hover:text-primary">{subject.name}</div>
                                        </Link>
                                    }
                                })
                            
                            : ""}
                        </div>
                    </section>
                    <section className="mt-3">
                        <div className="border rounded-lg border-base-100">
                            <div className="flex justify-between m-3">
                                <div className="inline-flex gap-2">
                                <IoIosPaper className="w-7 h-7" />
                                <strong>Kecerdasan TAMTAMA</strong>
                                </div>
                                <IoIosArrowDropdown className="w-6 h-6"/>
                                {/* TODO :Nanti rencana dibikin collapse */}
                            </div>
                            {subjectExam.length ? 
                                subjectExam.map((subject, i) => {
                                    if (subject.exam_dir == "/polri/psikolog/kecerdasan/tamtama") {
                                        return <Link href={route('exam.show')} data={{ id: subject.id, name: subject.name, exam_duration: subject.exam_duration }}>
                                            <div className="p-2 border hover:text-primary">{subject.name}</div>
                                        </Link>
                                    }
                                })
                            
                            : ""}
                        </div>
                    </section>

                    {/* <section className="flex">
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
                            "category",
                            "category",
                            "category",
                            "category",
                            "category",
                            "category",
                        ]}
                        // href={route("admin.subject")}
                        // active={route().current("admin.subject")}
                    >
                        <FaNotesMedical />
                        Pilih Try Out
                    </NavLinkCollapse>
                    </section> */}
                </div>
                <div className="hidden border-r mr-7 lg:block" />
                <div className="hidden mr-5 my-7 lg:block">
                    <h1 className="mb-4 font-bold">Tanggal Sekarang</h1>
                    <CalendarContainer className="drop-shadow-lg">
                        <Calendar onChange={onChange} value={date} />
                    </CalendarContainer>
                </div>

                <dialog id="modal_sudah_selesai" className="modal">
                    <div className="w-11/12 max-w-5xl modal-box">
                        <h3 className="text-lg font-bold">Akses ditolak!</h3>
                        <p className="py-4">
                            Materi yang sudah dikumpul tidak bisa dikerjakan
                            ulang
                        </p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <dialog id="modal_sudah_lewat" className="modal">
                    <div className="w-11/12 max-w-5xl modal-box">
                        <h3 className="text-lg font-bold">Akses ditolak!</h3>
                        <p className="py-4">
                            Akun anda belum bisa mengakses soal ini untuk sekarang, hubungi admin untuk mengakses soal ini
                        </p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </section>
            {/* </Sidebar> */}
        </AuthenticatedLayout>
    );
}
