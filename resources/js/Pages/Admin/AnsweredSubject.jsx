import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import PrimaryButton from '@/Components/PrimaryButton';
import subjectImage from '@/../assets/subject_image.png';
import moment from "moment/min/moment-with-locales";
import no_data from "@/../assets/no_data.svg";


export default function AnsweredSubject({ auth, title, flash, participant, overviews }) {
    moment.locale('id')
    return (

        <div className='min-h-screen'>
            <Head title={title} />
            <div className="drawer lg:drawer-open h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 h-full'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold py-3'>Jawaban <span className='text-primary'>
                                {participant.name}</span> - <span className='text-primary/80'> {participant.nim}</span> </h1>

                        </div>
                        {/* content */}

                        <div className="overflow-x-auto">
                            {
                                overviews.length ?
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Nama Materi Ujian</th>
                                                <th>Banyak Soal</th>
                                                <th>Banyak Terjawab</th>
                                                <th>Selesai Dikerjakan</th>
                                                <th>Nilai Sementara(tanpa essay)</th>
                                                <th>Nilai Akhir</th>
                                                <th class="text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {overviews.map((overview, i) => {
                                                console.log('length')
                                                let manyQuestion = overview.subject.exam.length
                                                let answered = overview.answered.answer
                                                let sumAnswered = 0
                                                answered.map((answer) => {
                                                    console.log(answer)
                                                    if (answer != null) {
                                                        sumAnswered++
                                                    }
                                                })
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={subjectImage} alt="Image Subject" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{overview.subject.name}</div>
                                                                    <div className="text-sm opacity-50">TryOut</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {manyQuestion}
                                                            <br />
                                                        </td>
                                                        <td>
                                                            <>{sumAnswered}</>
                                                        </td>

                                                        <td>

                                                            {moment(overview.updated_at).fromNow()}
                                                        </td>
                                                        <td>

                                                            {overview.temporary_mark}
                                                        </td>

                                                        <td>
                                                            {overview.final_mark == null ?
                                                                "Essay Belum Dinilai"
                                                                :
                                                                overview.final_mark
                                                            }
                                                        </td>
                                                        <td className="flex justify-start">
                                                            {/* Button View */}
                                                            <Link href={route('admin.review-exam')} data={{
                                                                overview_id: overview.id, answer_id: overview.answer_id,
                                                                subject_id: overview.subject_id, name: overview.subject.name, participant_id: overview.participant_id
                                                            }} >
                                                                <PrimaryButton>
                                                                    <strong className='text-white text-xs'>Lihat Jawaban</strong>

                                                                </PrimaryButton>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            )}




                                        </tbody>
                                        {/* foot */}
                                        <tfoot>
                                            <tr>
                                                <th>Nama Materi Ujian</th>
                                                <th>Banyak Soal</th>
                                                <th>Banyak Terjawab</th>
                                                <th>Selesai Dikerjakan</th>
                                                <th>Nilai Sementara(tanpa essay)</th>
                                                <th>Nilai Akhir</th>
                                                <th class="text-center">Aksi</th>
                                            </tr>
                                        </tfoot>

                                    </table>
                                    :
                                    <div className="my-auto w-full mt-10 ">
                                        <p className='text-center mt-3 mx-auto text-3xl font-kanit text-slate-600 font-normal'>No Data !! </p>
                                        <img className='w-40 h-32 mx-auto pt-7 mt-1' src={no_data} alt="no data" srcset="" />
                                        <p className='text-center mt-3 text-sm text-slate-600'>Belum ada Soal Ujian yang telah diselesaikan oleh peserta ini </p>
                                    </div>
                            }

                        </div>

                        {/* end of content               */}
                    </div>

                </div>
                <AdminDrawer></AdminDrawer>


            </div>
        </div>
    )
}