import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from "moment/min/moment-with-locales";
import no_data from "@/../assets/no_data.svg";
import polri from "@/../assets/img/polri.png";
import subject_image from "@/../assets/subject_image.png";
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { PrimaryButton, Sidebar, PopUpRule, NavLinkDashboard } from '@/Components';



export default function Home({ auth, subjectExam, submitted, flash }) {
    const intoSoal = useRef(null)
    const executeScroll = () => intoSoal.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const anchor = useRef('subject')
    const [date, setDate] = useState(new Date());
    const onChange = () => {
        setDate(date);
    }

    useEffect(() => {
        if (flash.message == 'Ujian telah berhasil disubmit!') {
            localStorage.clear()
        }
    })

    useEffect(() => {
        if (flash.message?.substr(0, 12) == 'sudahselesai') {
            document.getElementById('modal_sudah_selesai').showModal()
        }
        if (flash.message?.substr(0, 10) == 'sudahlewat') {
            document.getElementById('modal_sudah_lewat').showModal()
        }
    }, [flash.message]);

    const CalendarContainer = styled.div`
    /* ~~~ container styles ~~~ */
    @apply
    max-width: 300px;
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
            title: 'Anda yakin?',
            text: "Anda tidak bisa menghentikan pengerjaan try out setelah memulai pengerjaan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, saya yakin!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(route('exam.show', { id: id, name: name, exam_duration: exam_duration }))
            }
        })
    }

    moment.locale('id')

    const [openModal, setOpenModal] = useState(false);
    return (
        <AuthenticatedLayout
            user={auth.user} data={subjectExam}
        >
            <Head title="Home" />
            {/* <Sidebar> */}

            <section className='flex justify-center mx-5'>
                <div className='w-full max-w-screen-lg mx-9 my-7'>
                    <div className="w-full  rounded-2xl mb-10 bg-[#FBEDD7] bg-cover shadow-xl  ">
                        <div className="flex items-center justify-center card-body">
                            <p className="text-sm ">Hi, {auth.user.name} !</p>
                            <h2 className="font-semibold texl-xl sm:text-2xl ">Selamat Datang di website Try Out</h2>
                            <div className="flex justify-between">
                                {/* <PrimaryButton onClick={() => {
                                    setOpenModal(true);
                                }}>
                                    Cara Melaksanakan

                                </PrimaryButton> */}
                                <PrimaryButton onClick={executeScroll}>
                                    Mulai Mengerjakan
                                </PrimaryButton>
                                {openModal && <PopUpRule openModal={openModal} setOpenModal={setOpenModal} anchor={anchor} />}
                            </div>
                        </div>
                    </div>

                    <strong className='w-full text-center'>Pilih Try Out yang akan kamu kerjakan!</strong>

                    <section className='grid justify-center w-full grid-cols-3 gap-4 mx-auto mt-2'>
                        <Link href='category/polri/subcategory'>
                        <div className='h-48 rounded-md bg-slate-400 w-80'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>POLRI</strong>
                        </div>
                        </Link>

                        <div className='h-48 rounded-md bg-emerald-500 w-80'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>TNI</strong>
                        </div>
                        <div className='h-48 bg-gray-500 rounded-md w-80'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>KEDINASAN</strong>
                        </div>
                        <div className='h-48 bg-[#964b00] w-80 rounded-md'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>TES CPNS</strong>
                        </div>
                        <div className='h-48 rounded-md bg-sky-500 w-80'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>UTBK SBMPTN</strong>
                        </div>
                        <div className='h-48 bg-red-500 rounded-md w-80'>
                            <p className='mt-1 ml-1 text-white/80'>Kategori</p>
                            <div className='flex justify-center'>
                                <img src={polri} className='w-32 h-32 rounded-full' alt="" />
                            </div>
                            <strong className='block w-full mt-1 text-2xl text-center text-white/80'>UJIAN MANDIRI</strong>
                        </div>
                    </section>
                </div>
                {/* <div className="hidden border-r mr-7 lg:block" />
                <div className="hidden mr-5 my-7 lg:block">
                    <h1 className="mb-4 font-bold">Tanggal Sekarang</h1>
                    <CalendarContainer className="drop-shadow-lg">
                        <Calendar onChange={onChange} value={date} />
                    </CalendarContainer>
                </div> */}

                <dialog id="modal_sudah_selesai" className="modal">
                    <div className="w-11/12 max-w-5xl modal-box">
                        <h3 className="text-lg font-bold">Akses ditolak!</h3>
                        <p className="py-4">Materi yang sudah dikumpul tidak bisa dikerjakan ulang</p>
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
                        <p className="py-4">Try Out ini telah melewati periode pengerjaan yang ditentukan</p>
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
