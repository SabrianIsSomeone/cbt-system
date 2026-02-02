import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useState, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import CountdownTimer from '@/Components/CountdownTimer';
import no_data from "@/../assets/data_processing.svg";


const ExamPage = ({ auth, exam, title, subject, subjectId, timestampForTimer, flash, exam_type }) => {
    const [active, setActive] = useState(0)

    useEffect(() => {
        if (flash.message?.substr(0, 12) == 'belumselesai') {
            document.getElementById('modal_belum_selesai').showModal()
        }
    }, [flash.message]);

    // Logic Timer

    console.log('isi timestamp' + timestampForTimer)
    console.log("data user")
    console.log(auth.user.name)
    console.log("isi subjectId")
    console.log(subjectId)

    // Submit Data to Answer db

    const [answer, setAnswer] = useState(Array(exam.length).fill(null))
    const [answered, setAnswered] = useState(Array(exam.length).fill(false))

    // Untuk Nanti
    // const [correction, setCorrection] = useState(Array(exam.length).fill(false))
    const correction = Array(exam.length).fill(false)
    const all_mark = Array(exam.length).fill(null)
    const isCorrect = Array(exam.length).fill(null)

    let [alreadyAnswered, setAlreadyAnswered] = useState(0)

    function setSumAnswered() {
        answer.map((answered) => {
            if (answered != null) {
                alreadyAnswered++;
            }
        })

    }



    const { data, post, processing, recentlySuccessful } = useForm({
        answer: null,
        participant_id: auth.user.id,
        exam_subject: subject,
        subject_id: subjectId,

        correction_status: correction,
        mark: all_mark,
        is_correct: isCorrect,
    });

    const datachoice = [
        {
            choice: '',
        },
    ];



    const [tempChoice, setTempChoice] = useState(datachoice);

    function updateStateAnswer(index, value) {
        const newArray = tempChoice.map((item, i) => {
            if (index === i) {
                return { ...item, choice: value };
            } else {
                return item;
            }
        });
        setTempChoice(newArray)
        const trueChoice = []
        newArray.map((choices) => {
            trueChoice.push(choices.choice)
        })
    };

    const [amountAnswered, setAmountAnswered] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("answer" + subject + auth.user.name) != null) {
            setAnswer(localStorage.getItem("answer" + subject + auth.user.name).toString().split(","))
        }
        var aaa = 0
        answer.map((data) => {
            if (!(data?.length == 0 || data == null)) {
                setAmountAnswered(aaa + 1)
            }
        })
    }, [])

    useEffect(() => {
        length = answer.filter(d => d?.length > 0).length;
        setAmountAnswered(length)
    }, [answer])

    const updateStateEditAnswer = (index) => (e) => {
        const trueAnswer = answer.toString().split(",")
        trueAnswer[index] = e.target.value
        localStorage.setItem("answer" + subject + auth.user.name, trueAnswer)
        answered[index] = true
        localStorage.setItem("answered" + subject + auth.user.name, answered)
        setAnswer(trueAnswer)
    };

    function handleChoices(choice) {
        console.log("choice value : " + choice)
        if (answer[active] != null) {
            updateStateAnswer(active, choice)
            answer[active] = choice
            setSumAnswered()
        } else {
            updateStateAnswer(active, choice)
            answer[active] = choice
            setSumAnswered()
        }
        answered[active] = true
        localStorage.setItem("answer" + subject + auth.user.name, answer)
        localStorage.setItem("answered" + subject + auth.user.name, answered)
        length = answer.filter(d => d?.length > 0).length;
        console.log(`isi yang banyak soal yg udah dijawab : ${length}`)
        setAmountAnswered(length)
    }

    console.log("All Answer : " + answer)

    function handleSubmit() {
        localStorage.clear();
        data.answer = answer
        post(route('exam.submit', { data }));
    }

    return (
        <Authenticated user={auth.user} isExam={true}>
            <Head title={title} />
            {/* container */}

            {
                exam.length ?
                    <div className="justify-center mx-auto lg:flex">

                        <div className={exam_type == "hilang angka" ? "rounded-lg w-full pb-6 bg-secondary mx-auto" : "m-7 mr-4 rounded-lg max-w-3xl w-full pb-6 bg-secondary mx-auto"}>
                            {/* Time */}
                            <div className="flex items-center w-1/2">
                                <svg className="w-12 h-12 mr-4 m-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div>
                                    <p>Sisa waktu</p>
                                    <CountdownTimer countdownTimestampMs={timestampForTimer} subject={subject} auth={auth} handleSubmit={handleSubmit} />
                                </div>
                            </div>

                            {/* Question */}
                            <div className={'ml-9 mb-4 '+(exam_type == 'hilang angka' ? 'w-full' : 'w-3/4')}>
                                <p className={(exam_type == 'hilang angka' ? 'mx-auto text-center font-bold' : 'font-bold')}>Pertanyaan {active + 1} dari {exam.length}</p>
                                <br />
                                {exam_type != 'hilang angka' ? <strong className='text-slate-600 '>{exam[active].point} point</strong> : <></>}

                                {/* Logika Gambar Soal jika ada */}
                                {exam[active].image == null ? <></> : <img src={"/storage/" + exam[active].image} alt="" className='max-h-64' />}

                                <p className={'mt-1 '+ (exam_type == 'hilang angka' ? 'mx-auto text-center font-bold text-xl' : '')}>{exam[active].question}</p>
                            </div>

                            {/* Choice & Essay*/}
                            {exam[active].is_essay == 0 || false ?
                                <>
                                    <p className={"ml-9 font-semibibold w-full col-span-2 mb-2 " + (exam_type == 'hilang angka' ? 'text-center mb-5' : '')}>{exam_type == 'hilang angka' ? "Pilih angka yang hilang" : "Pilih salah satu"}</p>
                                    <div className={(exam_type == 'hilang angka' ? 'mx-auto w-3/4 flex justify-between' : 'm-7 w-80 grid grid-cols-2 gap-2')}>

                                        {exam[active].choice.map((choice, i) => {
                                            const letter = ['A', 'B', 'C', 'D', 'E']
                                            if (exam_type == 'hilang angka') {
                                                return <button onClick={() => { handleChoices(choice);
                                                    if(active + 1 < exam.length) {
                                                        setActive(active + 1)
                                                    } else {
                                                        handleSubmit()
                                                    }
                                                }} className={' shadow-lg ring-1 normal-case p-2 rounded-lg border ' + (answer[active] == choice ? 'bg-primary' : 'bg-white') + ' w-full mx-3'} >
                                                    <strong>
                                                        {letter[i]} . {choice}
                                                    </strong>
                                                </button>
                                            } else {
                                                return <button onClick={() => { handleChoices(choice) }} className={' shadow-lg ring-1 normal-case p-2 rounded-lg border ' + (answer[active] == choice ? 'bg-primary' : 'bg-white')} >
                                                    <strong>
                                                        {letter[i]} . {choice}
                                                    </strong>
                                                </button>
                                            }
                                        })}
                                    </div>

                                </>
                                :

                                <div className="w-4/5 ml-10 lg:w-2/5">
                                    <InputLabel className="my-2" htmlFor="body" value="Jawaban" />
                                    <textarea id="essay" className="w-full rounded-lg min-w-2xl border-primary bg-base-100/35 " name='body' placeholder="ketik jawabanmu disini" value={answer[active]}
                                        onChange={updateStateEditAnswer(active)}
                                    />

                                </div>
                            }



                            {/* Prev & Next */}
                            {exam_type == 'hilang angka' ? <></> :
                                <div className="flex justify-center w-full mx-auto font-bold gap-7 mt-9">
                                    {active > 0 &&
                                        <button className="p-3 px-5 m-2 bg-white border rounded-lg shadow-lg ring-1 focus:glass focus:bg-secondary/70" onClick={() => { setActive(active - 1), setPlus(active - 1) }}>
                                            Prev
                                        </button>

                                    }

                                    {active + 1 < exam.length &&
                                        <button className="p-3 px-5 m-2 border rounded-lg shadow-lg bg-primary/50 ring-1 hover:bg-primary/70 border-primary " onClick={() => { setActive(active + 1); setPlus(active + 1) }}>
                                            Next
                                        </button>
                                    }
                                </div>

                            }


                        </div>

                        {/* Number Navigation  & Etc*/}
                        {exam_type == 'hilang angka' ? <></>
                        :
                        <div className="p-1 pt-3 m-5 mx-auto ml-0 border-2 rounded-lg mt-7 border-primary">
                            <strong className="p-3">Navigasi Soal</strong>
                            <div className="grid grid-cols-7 gap-2 m-1 mt-3 text-center sm:grid-cols-10">
                                {answer.map((answered, i) => {
                                    return <button onClick={() => { setActive(i) }} className={' shadow-lg ring-1 p-2 rounded-lg border ' + (active == i ? 'bg-primary' : (answered?.length == 0 || answered == null ? 'bg-secondary' : 'bg-green-400'))} >{i + 1}</button>

                                })}
                            </div>

                            <div className="flex items-center justify-center mt-10">
                                <div className="text-lg font-extrabold border-4 border-orange-300  w-28 h-28 radial-progress text-primary font-kanit" style={{ "--value": (amountAnswered) / exam.length * 100, "--size": "12rem", "--thickness": "5px" }} role="progressbar">{amountAnswered} /{exam.length} <span className='text-sm'>
                                    Terjawab</span></div>
                                {/* <label htmlFor="my_modal_7">
                                Kumpul Jawaban
                        </label> */}
                                {/* The button to open modal */}
                                <PrimaryButton className="my-10" onClick={() => document.getElementById('my_modal_1').showModal()} disabled={processing}>Kumpul Jawaban
                                    {/* <label htmlFor="my_modal_7" >Kumpul Jawaban</label> */}
                                </PrimaryButton>

                                {/* Put this part before </body> tag */}
                                {/* <input type="checkbox" id="my_modal_1" className="modal-toggle" /> */}
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box bg-base-100/90">
                                        <h3 className="text-lg font-bold">Yakin Ingin Mengumpulkan Sekarang ?</h3>
                                        <p className="py-2">Pastikan jawaban anda sudah diisi dengan jujur & benar !</p>
                                        <div className="modal-action">
                                            <form method="dialog" >
                                                {/* if there is a button in form, it will close the modal */}
                                                <PrimaryButton className="my-6" onClick={handleSubmit} disabled={processing}>
                                                    Kumpul Jawaban
                                                </PrimaryButton>
                                                <PrimaryButton className="bg-red-500 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                                    Cancel</PrimaryButton>
                                            </form>
                                        </div>

                                        <label className="modal-backdrop" htmlFor="my_modal_1" >Close</label>
                                    </div>
                                </dialog>
                            </div>



                        </div>

                        }

                        <dialog id="modal_belum_selesai" className="modal">
                            <div className="w-11/12 max-w-5xl modal-box">
                                <h3 className="text-lg font-bold">Akses ditolak!</h3>
                                <p className="py-4">Anda tidak bisa mengakses menu yang lain sebelum mengumpul jawaban soal subjek ini</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    :
                    <div className="my-auto">
                        <img className='w-40 h-32 mx-auto mt-3 pt-7' src={no_data} alt="no data" srcset="" />
                        <p className='mt-3 text-sm text-center text-slate-600'>Belum ada Soal Ujian </p>
                    </div>
            }


        </Authenticated>
    )
}

export default ExamPage
