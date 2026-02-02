import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { IoTrashSharp } from "react-icons/io5";
import { Link, Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { useEffect } from "react";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import moment from "moment/min/moment-with-locales";
import { BiHandicap } from 'react-icons/bi';
import { IoReload } from "react-icons/io5";

export default function ReviewExam({ auth, flash, title, exams, subject, answered, subjectId, overview, essayCount }) {
    const [showSuccess, setShowSuccess] = useState(false)
    console.log(subjectId)
    useEffect(() => {
        if (flash.message?.substr(0, 11) != null) {
            setShowSuccess(true)
        }
    }, [flash.message]);



    const [kategori, setKategori] = useState("Semua Soal")

    useEffect(() => {
        moment.locale('id')

    }, [])


    let panjangIndexAnswer = answered.answer.length

    const _exams = exams.slice(0, panjangIndexAnswer)



    const [allPointEssay, setAllPointEssay] = useState(Array);


    // State For Corrected And True/False Answer
    const answer = answered.answer
    const participant = overview.participant
    const [isCorrected, setIsCorrected] = useState(answered.correction_status)
    const [isTrue, setIsTrue] = useState(answered.is_correct)
    const [allMark, setAllMark] = useState(answered.mark)


    function handleIncorrect(i) {
        // Point 0 if incorrect


        // setAllPointEssay([...allPointEssay, 0])
        // Change State Corrected in Array

        // Nilai
        const newStateMark = [...allMark]
        newStateMark[i] = 0
        setAllMark(newStateMark)

        const newStateCorrected = [...isCorrected]
        newStateCorrected[i] = true
        setIsCorrected(newStateCorrected)

        // Change State isTrue in Array
        const newStateIsTrue = [...isTrue]
        newStateIsTrue[i] = false
        setIsTrue(newStateIsTrue)
    }

    function handleCorrect(pointChange, i) {

        // setAllPointEssay([...allPointEssay, pointChange])

        // Ubah Nilai
        const newStateMark = [...allMark]
        newStateMark[i] = pointChange
        setAllMark(newStateMark)

        // Change State Corrected in Array
        const newStateCorrected = [...isCorrected]
        newStateCorrected[i] = true
        setIsCorrected(newStateCorrected)

        // Change State isTrue in Array
        const newStateIsTrue = [...isTrue]
        newStateIsTrue[i] = true
        setIsTrue(newStateIsTrue)
    }

    function handleReloadMark(i) {
        // Change State Corrected in Array
        const newStateCorrected = [...isCorrected]
        newStateCorrected[i] = false
        setIsCorrected(newStateCorrected)

        // Ubah Nilai
        const newStateMark = [...allMark]
        newStateMark[i] = null
        setAllMark(newStateMark)

        // Jadiin null
        const newStateIsTrue = [...isTrue]
        newStateIsTrue[i] = null
        setIsTrue(newStateIsTrue)
    }

    const { data, setData, patch, processing, errors } = useForm({
        id: overview.id,
        subject_id: subjectId,
        participant_id: participant.id,
        essay_correct: '',
        essay_mark: '',
        final_mark: '',

        // New Update for Answer
        answer_id: answered.id,
        correction_status: '',
        is_correct: '',
        mark: '',

        //
        multiple_choice_correct: '',

    })

    console.log('isi corrected sekarang : ')
    console.log(isCorrected)


    console.log(errors)

    // Ini harus dibawah
    function submit() {
        // Add All Point from ArrayPoint
        let essayMark = 0
        let essayCorrect = 0
        // allPointEssay.map((point) => {
        //     essayMark += point
        //     if (point != 0) {
        //         essayCorrect++;
        //     }
        // })

        let MCCorrect = 0
        _exams.map((data, i) => {
            // Kalo pilgan benar
            if (!data.is_essay && isTrue[i]) {
                MCCorrect++

                // Kalo Essay benar
            } else if (data.is_essay && isTrue[i]) {
                essayCorrect++
            }
        })


        console.log('essayMark :')
        console.log(essayMark)
        console.log('essayCorrect :')
        console.log(MCCorrect)

        let finalMark = 0
        allMark.map((point) => {
            finalMark += point
        })
        console.log('finalMark')
        console.log(finalMark)
        data.id = overview.id
        data.subject_id = subjectId
        data.participant_id = participant.id
        data.essay_correct = essayCorrect
        data.essay_mark = essayMark
        data.final_mark = finalMark

        const newStateCorrected = [...isCorrected]
        data.correction_status = newStateCorrected

        const newStateIsCorrect = [...isTrue]
        data.is_correct = newStateIsCorrect

        const newStateAllMark = [...allMark]
        data.mark = newStateAllMark

        data.multiple_choice_correct = MCCorrect

        patch(route('admin.update-overview', data, {
            _method: 'PATCH',
        }));
    }
    console.log("Isi Benar Salah Setiap soal")
    console.log(isTrue)
    console.log("Isi Setiap Nilai Soal")
    console.log(allMark)
    return (
        <div className='min-h-screen'>
            <Head title={`${title}  ${subject}`} />

            <div className="drawer lg:drawer-open min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral min-h-screen">
                    <Navbar user={auth.user} />
                    <div className='mx-12 mt-6 min-h-screen'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold'>Jawaban Soal Ujian {subject} dari Peserta {participant.name}</h1>


                            <ul className="menu menu-horizontal   z-[999] items-center opacity-100 shrink-0 px-1  ">
                                <li tabIndex={0}>
                                    <details>
                                        <summary className='text-xl  text-primary'>{kategori}</summary>
                                        <ul className="p-2 text-sm w-36 bg-white ml-3">
                                            <li className='hover:text-primary' default onClick={() => setKategori("Semua Soal")}><a>Semua Soal</a></li>
                                            <li className='hover:text-primary' onClick={() => setKategori("Essay")}><a>Essay</a></li>
                                            <li className='hover:text-primary' onClick={() => setKategori("Pilgan")}><a>Pilihan Ganda</a></li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>





                        </div>

                        <section className='w-full'>
                            <div className='flex gap-44 '>
                                <div>
                                    <strong className="text-xl text-primary">Data Peserta :</strong>
                                    <p className='font-semibold'>Nama : <span className='font-normal'>{participant.name}</span></p>
                                    <p className='font-semibold'>NIM : <span className='font-normal'>{participant.nim}</span></p>
                                    <p className='font-semibold'>Email : <span className='font-normal'>{participant.email}</span></p>
                                    <p className='font-semibold'>No Telepon : <span className='font-normal'>{participant.phone ? participant.phone : '_'}</span></p>
                                    <p className='font-semibold'>Selesai Dikerjakan : <span className='font-normal'>{moment(answered.updated_at).fromNow()}</span></p>
                                </div>
                                <div>
                                    <strong className="text-xl text-primary">Overview :</strong>
                                    <p className='font-medium'>Jumlah Pilihan Ganda benar : <span className='font-normal'>{overview.multiple_choice_correct}</span></p>
                                    <p className='font-medium'>Jumlah Essay benar : <span className='font-normal'>{overview.essay_correct}</span></p>
                                    <p className='font-medium'>Nilai Sementara : <span className='font-normal'>{overview.temporary_mark?.toFixed(1)}</span></p>
                                    {/* <p className='font-medium'>Nilai Rata-rata dari Semua Ujian : <span className='font-normal'>{overview.average_mark ? overview.average_mark : '_'}</span></p> */}
                                    <p className='font-medium'>Nilai Akhir : <span className='font-normal'>{overview.final_mark?.toFixed(1)}</span></p>
                                </div>

                            </div>

                        </section>

                        <div className="flex justify-end">
                            <PrimaryButton onClick={submit}> Simpan
                            </PrimaryButton>
                        </div>
                        {flash.message &&
                            <div className="alert bg-primary/40 mx-auto mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{flash.message}</span>
                            </div>
                        }

                        {/* content */}
                        <section className="mt-7">
                            {/* ALl Type */}
                            {
                                _exams.map((data, i) => {
                                    if (kategori == "Semua Soal" && _exams.length) {
                                        if (!data.is_essay) {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i] && isCorrected[i] != null) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])
                                            return (
                                                <div className="card w-full my-3 h-max bg-secondary text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl' />}
                                                        <div className='flex justify-between'>
                                                            <p className='max-w-3xl'>{i + 1}. {data.question} <span className='font-medium text-green-900'> {'(' + data.point + ' point)'}</span></p>
                                                            {
                                                                isCorrected[i] ?
                                                                    (

                                                                        isTrue[i] ?
                                                                            <div className='flex items-center gap-5'>
                                                                                <h1 className='text-emerald-500 text-base whitespace-nowrap'>+ {allMark[i]} Point</h1>
                                                                                <button className='hover:scale-110 transition-all'>
                                                                                    <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            // Kalo salah
                                                                            <div className='flex items-center gap-5'>
                                                                                <h1 className='text-warning text-base whitespace-nowrap'> 0 Point</h1>
                                                                                <button className='hover:scale-110 transition-all'>
                                                                                    <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                                </button>
                                                                            </div>
                                                                    )
                                                                    :
                                                                    <>
                                                                        <ul className=" menu-horizontal  z-[999] items-center  opacity-100 shrink-0 px-1  ">
                                                                            <li tabIndex={0}>
                                                                                <details>
                                                                                    <summary className='text-lg   text-primary'>{pointChange} Points</summary>
                                                                                    <ul className="p-2 text-base w-24 text-left bg-white ml-3">
                                                                                        {pointArray.map(point =>
                                                                                            <li className='hover:text-primary' default onClick={() => {
                                                                                                setPointChange(point)
                                                                                                const newStateMark = [...allMark]
                                                                                                newStateMark[i] = point
                                                                                                setAllMark(newStateMark)
                                                                                            }

                                                                                            }><a>{point} Point</a></li>
                                                                                        )}
                                                                                    </ul>
                                                                                </details>
                                                                            </li>
                                                                        </ul>

                                                                    </>
                                                            }

                                                        </div>
                                                        <ul>
                                                            <li className='font-medium'>A. {data.choice[0]}</li>
                                                            <li className='font-medium'>B. {data.choice[1]}</li>
                                                            <li className='font-medium'>C. {data.choice[2]}</li>
                                                            <li className='font-medium'>D. {data.choice[3]}</li>
                                                        </ul>

                                                        <div className='flex justify-between'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong >
                                                                    {answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                        Tidak Dijawab
                                                                    </span>}</strong></h1>
                                                                <p>Jawaban yang benar : <strong className="text-green-800">
                                                                    {data.actual_answer}</strong></p>
                                                            </div>

                                                            <div className="card-actions justify-end -mr-4">
                                                                {!isCorrected[i] ?
                                                                    <>
                                                                        <button className='button-incorrect text-base -mr-7'
                                                                            onClick={() => {
                                                                                handleIncorrect(i)
                                                                            }}>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </button>

                                                                        <button className='button-correct' onClick={() => {
                                                                            handleCorrect(pointChange, i, true)
                                                                        }}>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                    :

                                                                    (
                                                                        isTrue[i] == true ?
                                                                            <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                            </button>
                                                                            :
                                                                            <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                                                            </button>
                                                                    )

                                                                }

                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i]) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])


                                            return (
                                                <div className="card w-full my-3 bg-secondary min-h-screen max-h-max text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                                                        <div className='flex justify-between items-start'>
                                                            <p className='max-w-screen-md text-wrap '>{i + 1}. {data.question} <span className='font-medium  text-green-900'> {'(' + data.point + ' points)'}</span></p>
                                                            {
                                                                !isCorrected[i] ?
                                                                    <>
                                                                        <ul className=" menu-horizontal  z-[999] items-center  opacity-100 shrink-0 px-1  ">
                                                                            <li tabIndex={0}>
                                                                                <details>
                                                                                    <summary className='text-lg   text-primary'>{pointChange} Points</summary>
                                                                                    <ul className="p-2 text-base w-24 text-left bg-white ml-3">
                                                                                        {pointArray.map(point =>
                                                                                            <li className='hover:text-primary' default onClick={() => {
                                                                                                setPointChange(point)
                                                                                                const newStateMark = [...allMark]
                                                                                                newStateMark[i] = point
                                                                                                setAllMark(newStateMark)
                                                                                            }

                                                                                            }><a>{point} Point</a></li>
                                                                                        )}
                                                                                    </ul>
                                                                                </details>
                                                                            </li>
                                                                        </ul>

                                                                    </>
                                                                    :
                                                                    (isTrue[i] ?
                                                                        <div className="flex gap-4 items-center">
                                                                            <h1 className='text-emerald-500 text-base whitespace-nowrap'>+ {allMark[i] ? allMark[i] : pointChange} Point</h1>
                                                                            <button className='hover:scale-110 transition-all'>
                                                                                <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className='flex gap-4 items-center'>

                                                                            <h1 className='text-warning text-base whitespace-nowrap'> 0 Point</h1>
                                                                            <button className='hover:scale-110 transition-all'>
                                                                                <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                            </button>
                                                                        </div>
                                                                    )

                                                            }

                                                        </div>

                                                        <div className='flex justify-between mt-2'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong>{answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                    Tidak Dijawab
                                                                </span>}</strong></h1>
                                                                <h1>Jawaban yang Benar : <strong className="text-green-800">{data.actual_answer}</strong></h1>

                                                            </div>

                                                            <div className="card-actions -mr-4 items-end  ">

                                                                {!isCorrected[i] ?
                                                                    <>
                                                                        <button className='button-incorrect text-base -mr-7'
                                                                            onClick={() => {
                                                                                handleIncorrect(i)
                                                                                const newState = [...isCorrected]
                                                                                newState[i] = !isCorrected[i]
                                                                                setIsCorrected(newState)
                                                                                // setIsTrue(false)
                                                                            }}>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </button>

                                                                        <button className='button-correct' onClick={() => {
                                                                            handleCorrect(pointChange, i)

                                                                        }}>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                    :

                                                                    (
                                                                        isTrue[i] == true ?
                                                                            <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                            </button>
                                                                            :
                                                                            <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                                                            </button>
                                                                    )

                                                                }
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            )
                                        }



                                    } else if (kategori == "Essay" && _exams.length) {
                                        if (!data.is_essay) {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i] && isCorrected[i] != null) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])
                                            return (
                                                <div className="hidden card w-full my-3 h-max bg-secondary text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl' />}
                                                        <div className='flex justify-between'>
                                                            <p className='w-3/4'>{i + 1}. {data.question} <span className='font-medium text-green-900'> {'(' + data.point + ' point)'}</span></p>
                                                            {
                                                                isTrue[i] ?
                                                                    <h1 className='text-emerald-500 text-base whitespace-nowrap'>+ {allMark[i]} Point</h1>
                                                                    :
                                                                    <h1 className='text-warning text-base whitespace-nowrap'> 0 Point</h1>
                                                            }

                                                        </div>

                                                        <ul>
                                                            <li className='font-medium'>A. {data.choice[0]}</li>
                                                            <li className='font-medium'>B. {data.choice[1]}</li>
                                                            <li className='font-medium'>C. {data.choice[2]}</li>
                                                            <li className='font-medium'>D. {data.choice[3]}</li>
                                                        </ul>

                                                        <div className='flex justify-between'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong >
                                                                    {answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                        Tidak Dijawab
                                                                    </span>}</strong></h1>
                                                                <p>Jawaban yang benar : <strong className="text-green-800">
                                                                    {data.actual_answer}</strong></p>
                                                            </div>

                                                            <div className="card-actions justify-end -mr-4">
                                                                {
                                                                    isTrue[i] ? <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                    </svg>
                                                                    </button>
                                                                        :
                                                                        <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                        </svg>
                                                                        </button>
                                                                }
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i]) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])


                                            return (
                                                <div className="card w-full my-3 bg-secondary min-h-screen max-h-max text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                                                        <div className='flex justify-between items-start'>
                                                            <p className='max-w-screen-md text-wrap '>{i + 1}. {data.question} <span className='font-medium  text-green-900'> {'(' + data.point + ' points)'}</span></p>
                                                            {
                                                                !isCorrected[i] ?
                                                                    <>
                                                                        <ul className=" menu-horizontal  z-[999] items-center  opacity-100 shrink-0 px-1  ">
                                                                            <li tabIndex={0}>
                                                                                <details>
                                                                                    <summary className='text-lg   text-primary'>{pointChange} Points</summary>
                                                                                    <ul className="p-2 text-base w-24 text-left bg-white ml-3">
                                                                                        {pointArray.map(point =>
                                                                                            <li className='hover:text-primary' default onClick={() => {
                                                                                                setPointChange(point)
                                                                                                const newStateMark = [...allMark]
                                                                                                newStateMark[i] = point
                                                                                                setAllMark(newStateMark)
                                                                                            }

                                                                                            }><a>{point} Point</a></li>
                                                                                        )}
                                                                                    </ul>
                                                                                </details>
                                                                            </li>
                                                                        </ul>

                                                                    </>
                                                                    :
                                                                    (isTrue[i] ?
                                                                        <div className="flex gap-4 items-center">
                                                                            <h1 className='text-emerald-500 text-lg'>+ {allMark[i] ? allMark[i] : pointChange} Point</h1>
                                                                            <button className='hover:scale-110 transition-all'>
                                                                                <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className='flex gap-4 items-center'>
                                                                            <h1 className='text-warning text-lg'> 0 Point</h1>
                                                                            <button className='hover:scale-110 transition-all'>
                                                                                <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                            </button>
                                                                        </div>
                                                                    )

                                                            }

                                                        </div>

                                                        <div className='flex justify-between mt-2'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong>{answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                    Tidak Dijawab
                                                                </span>}</strong></h1>
                                                                <h1>Jawaban yang Benar : <strong className="text-green-800">{data.actual_answer}</strong></h1>

                                                            </div>

                                                            <div className="card-actions -mr-4 items-end  ">

                                                                {!isCorrected[i] ?
                                                                    <>
                                                                        <button className='button-incorrect text-base -mr-7'
                                                                            onClick={() => {
                                                                                handleIncorrect(i)
                                                                                const newState = [...isCorrected]
                                                                                newState[i] = !isCorrected[i]
                                                                                setIsCorrected(newState)
                                                                                // setIsTrue(false)
                                                                            }}>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </button>

                                                                        <button className='button-correct' onClick={() => {
                                                                            handleCorrect(pointChange, i)

                                                                        }}>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                    :

                                                                    (
                                                                        isTrue[i] == true ?
                                                                            <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                            </button>
                                                                            :
                                                                            <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                                                            </button>
                                                                    )

                                                                }
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            )
                                        }


                                    } else if (kategori == "Pilgan" && _exams.length) {
                                        if (!data.is_essay) {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i] && isCorrected[i] != null) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])
                                            return (
                                                <div className="card w-full my-3 h-max bg-secondary text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl' />}
                                                        <div className='flex justify-between'>
                                                            <p className='max-w-3xl'>{i + 1}. {data.question} <span className='font-medium text-green-900'> {'(' + data.point + ' point)'}</span></p>
                                                            {
                                                                isCorrected[i] ?
                                                                    (

                                                                        isTrue[i] ?
                                                                            <div className='flex items-center gap-5'>
                                                                                <h1 className='text-emerald-500 text-lg'>+ {allMark[i]} Point</h1>
                                                                                <button className='hover:scale-110 transition-all'>
                                                                                    <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <div className='flex items-center gap-5'>
                                                                                <h1 className='text-warning text-lg'> 0 Point</h1>
                                                                                <button className='hover:scale-110 transition-all'>
                                                                                    <IoReload onClick={() => handleReloadMark(i)} className='w-6 h-6 stroke-yellow-500 fill-yellow-500' />
                                                                                </button>
                                                                            </div>
                                                                    )
                                                                    :
                                                                    <>
                                                                        <ul className=" menu-horizontal  z-[999] items-center  opacity-100 shrink-0 px-1  ">
                                                                            <li tabIndex={0}>
                                                                                <details>
                                                                                    <summary className='text-lg   text-primary'>{pointChange} Points</summary>
                                                                                    <ul className="p-2 text-base w-24 text-left bg-white ml-3">
                                                                                        {pointArray.map(point =>
                                                                                            <li className='hover:text-primary' default onClick={() => {
                                                                                                setPointChange(point)
                                                                                                const newStateMark = [...allMark]
                                                                                                newStateMark[i] = point
                                                                                                setAllMark(newStateMark)
                                                                                            }

                                                                                            }><a>{point} Point</a></li>
                                                                                        )}
                                                                                    </ul>
                                                                                </details>
                                                                            </li>
                                                                        </ul>

                                                                    </>
                                                            }

                                                        </div>
                                                        <ul>
                                                            <li className='font-medium'>A. {data.choice[0]}</li>
                                                            <li className='font-medium'>B. {data.choice[1]}</li>
                                                            <li className='font-medium'>C. {data.choice[2]}</li>
                                                            <li className='font-medium'>D. {data.choice[3]}</li>
                                                        </ul>

                                                        <div className='flex justify-between'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong >
                                                                    {answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                        Tidak Dijawab
                                                                    </span>}</strong></h1>
                                                                <p>Jawaban yang benar : <strong className="text-green-800">
                                                                    {data.actual_answer}</strong></p>
                                                            </div>

                                                            <div className="card-actions justify-end -mr-4">
                                                                {!isCorrected[i] ?
                                                                    <>
                                                                        <button className='button-incorrect text-base -mr-7'
                                                                            onClick={() => {
                                                                                handleIncorrect(i, true)
                                                                            }}>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </button>

                                                                        <button className='button-correct' onClick={() => {
                                                                            handleCorrect(pointChange, i, true)
                                                                        }}>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                    :

                                                                    (
                                                                        isTrue[i] == true ?
                                                                            <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                            </button>
                                                                            :
                                                                            <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                                                            </button>
                                                                    )

                                                                }

                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            const pointArray = []
                                            for (let point = 0.5; point <= data.point; point += 0.5) {
                                                pointArray.push(point);
                                            }

                                            const [pointChange, setPointChange] = useState(data.point)

                                            useEffect(() => {
                                                if (isCorrected[i]) {
                                                    setPointChange(allMark[i])
                                                }
                                            }, [])


                                            return (
                                                <div className="hidden card w-full my-3 bg-secondary min-h-screen max-h-max text-primary-content" key={i}>
                                                    <div className="card-body">
                                                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                                                        <div className='flex justify-between items-start'>
                                                            <p className='w-3/4'>{i + 1}. {data.question} <span className='font-medium  text-green-900'> {'(' + data.point + ' points)'}</span></p>
                                                            {
                                                                !isCorrected[i] ?
                                                                    <>
                                                                        <ul className=" menu-horizontal  z-[999] items-center  opacity-100 shrink-0 px-1  ">
                                                                            <li tabIndex={0}>
                                                                                <details>
                                                                                    <summary className='text-lg   text-primary'>{pointChange} Points</summary>
                                                                                    <ul className="p-2 text-base w-24 text-left bg-white ml-3">
                                                                                        {pointArray.map(point =>
                                                                                            <li className='hover:text-primary' default onClick={() => {
                                                                                                setPointChange(point)
                                                                                                const newStateMark = [...allMark]
                                                                                                newStateMark[i] = point
                                                                                                setAllMark(newStateMark)
                                                                                            }

                                                                                            }><a>{point} Point</a></li>
                                                                                        )}
                                                                                    </ul>
                                                                                </details>
                                                                            </li>
                                                                        </ul>
                                                                    </>
                                                                    :
                                                                    (isTrue[i] ?
                                                                        <h1 className='text-emerald-500 text-lg'>+ {allMark[i] ? allMark[i] : pointChange} Point</h1>
                                                                        :
                                                                        <h1 className='text-warning text-lg'> 0 Point</h1>
                                                                    )

                                                            }

                                                        </div>

                                                        <div className='flex justify-between mt-2'>
                                                            <div className="">
                                                                {/* <button className="btn">Buy Now</button> */}
                                                                <h1>Dijawab : <strong>{answer[i] != null ? answer[i] : <span className="text-red-700">
                                                                    Tidak Dijawab
                                                                </span>}</strong></h1>
                                                                <h1>Jawaban yang Benar : <strong className="text-green-800">{data.actual_answer}</strong></h1>

                                                            </div>

                                                            <div className="card-actions -mr-4 items-end  ">

                                                                {!isCorrected[i] ?
                                                                    <>
                                                                        <button className='button-incorrect text-base -mr-7'
                                                                            onClick={() => {
                                                                                handleIncorrect()
                                                                                const newState = [...isCorrected]
                                                                                newState[i] = !isCorrected[i]
                                                                                setIsCorrected(newState)
                                                                                // setIsTrue(false)
                                                                            }}>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </button>

                                                                        <button className='button-correct' onClick={() => {
                                                                            handleCorrect(pointChange, i)

                                                                        }}>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                    :

                                                                    (
                                                                        isTrue[i] == true ?
                                                                            <button className='button-correct'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                            </svg>
                                                                            </button>
                                                                            :
                                                                            <button className='button-incorrect'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                                                            </button>
                                                                    )

                                                                }
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }
                                )


                            }
                        </section>

                        {/* end of content               */}
                    </div>

                </div>
                <AdminDrawer />


            </div>
        </div>
    )
}
