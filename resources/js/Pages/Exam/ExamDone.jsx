import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import moment from "moment/min/moment-with-locales";
import PrimaryButton from '@/Components/PrimaryButton';

const ExamDone = ({ auth, title, subject, data }) => {
    moment.locale('id')
    const convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
        m = m < 10 ? '0' + m + ' menit' : m + ' menit'; // (or alternatively) m = String(m).padStart(2, '0')
        return `${h} jam ${m} `;
    }

    const hours = convertMinsToHrsMins(data.subject.exam_duration)

    const arrJawaban = data.answered.answer
    let terjawab = 0
    arrJawaban.map((answer) => {
        if (answer != null) {
            terjawab++;
        }
        console.log(answer != null)
        console.log('Isi Terjawab sekarang')
        console.log(terjawab)
    })
    const banyakSoal = data.subject.exam.length
    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="m-6">
                <div className="border-t-2 bg-clip-border border-primary " />
                <h1 className="text-3xl mt-4">{title} - <span>{subject}</span></h1>
                <h1 className="mt-2 font-bold">Dibuka: <span className="font-medium"> {moment(data.subject.exam_started).format('LLLL')}</span></h1>
                <h1 className=" font-bold">Ditutup: <span className="font-medium"> {moment(data.subject.exam_ended).format('LLLL')}</span></h1>
                <div className="mt-4 border-t-2 bg-clip-border border-secondary " />
            </div>

            <div className="flex justify-center">
                <div className="text-center ">
                    <h1>Jumlah percobaan yang diperbolehkan: 1</h1>
                    <h1>Waktu Pengerjaan: {hours} </h1>
                </div>
            </div>

            <div className="m-6 pb-16">
                <h1>Ringkasan percobaan-percobaan sebelumnya</h1>
                <div className="overflow-x-auto m-5">
                    <table className="table bg-secondary/70">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Keadaan</th>
                                <th>Nilai/100,00</th>
                                <th>Terjawab</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="bg-primary/10">
                                <td className="">
                                    <p> Selesai</p>
                                    <p>Terkumpul {moment(data.updated_at).format('LLLL')}</p>
                                </td>
                                <td>{terjawab} dari {banyakSoal} terjawab</td>
                                <td>Belum dinilai/Nilai tidak tersedia</td>
                                <td>Review tidak tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 className='mt-3 text-red-800'>Untuk saat ini nilai anda tidak bisa dilihat</h1>
                </div>

                <h1 className='text-center text-red-950'>Tidak ada lagi percobaan yang diperbolehkan</h1>

                <div className='flex justify-center'>
                    <Link href={route('home')}>
                        <PrimaryButton >
                            Kembali ke Home
                        </PrimaryButton>
                    </Link>
                </div>

            </div>


        </Authenticated>
    )
}

export default ExamDone
