import React, { useState, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { IoTrashSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link, Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import moment from "moment/min/moment-with-locales";

export default function CreateEditExam({ auth, flash, title, exam, subject, subject_id, exam_type }) {
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => {
    if (flash.message?.substr(0, 11) != null) {
      setShowSuccess(true)
    }
  }, [flash.message]);

  const answerRef = useRef();

  const [examState, setEditExamState] = useState(exam);
  const [isDeleteImg, setIsDeleteImg] = useState(false);
  const [pointEdit, setEditPoint] = useState('');
  const [questionEdit, setEditQuestion] = useState(null);
  const [id, setIdEdit] = useState(null);
  const [choiceEdit, setEditChoice] = useState(['', '', '', '']);
  const [imageEdit, setEditImage] = useState(null);
  const [isEssayEdit, setEditIsEssay] = useState(false);
  const [actualAnswerEdit, setEditActualAnswer] = useState(null);
  const [indexAns, setEditIndexAns] = useState(null);

  const [question, setQuestion] = useState('');
  const [choice, setChoice] = useState(["soal essay"]);
  const [image, setImage] = useState(null);
  const [is_essay, setIsEssay] = useState(true);
  const [actual_answer, setActualAnswer] = useState("Jawaban essay");
  const [exam_started, setExamStarted] = useState("2024-01-03 10:42:17");
  const [exam_ended, setExamEnded] = useState("2024-01-03 11:42:17");
  const [exam_duration, setExamDuration] = useState("90");
  const [point, setPoint] = useState(2);
  const [subjects, setSubject] = useState(subject);

  const { data, setData, post, processing, errors } = useForm({
    subject_id: subject_id,
    question: null,
    choice: ['', '', '', '', ''],
    image: null,
    is_essay: false,
    actual_answer: null,
    point: '',

    // subject: subjects,
    // exam_started: "2024-01-03 10:42:17",
    // exam_ended: "2024-01-03 11:42:17",
    // exam_duration: "90",
  })
  console.log(errors)

  const confirmDelete = (i) => {
    const id = i
    const data = {
      id
    }

    Swal.fire({
      title: 'Anda yakin?',
      text: "Soal yang sudah dihapus tidak bisa dikembalikan lagi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.post('/dashboard/soal/delete-soal', data)
      }
    })
  }

  const datachoice = [
    {
      id: 1,
      choice: '',
    },
    {
      id: 2,
      choice: '',
    },
    {
      id: 3,
      choice: '',
    },
    {
      id: 4,
      choice: '',
    },
    {
      id: 5,
      choice: '',
    },
  ];

  const datachoiceedit = [
    {
      choice: '',
    },
    {
      choice: '',
    },
    {
      choice: '',
    },
    {
      choice: '',
    },
    {
      choice: '',
    },
  ];

  const [tempChoice, setTempChoice] = useState(datachoice);

  const [tempEditChoice, setTempEditChoice] = useState(datachoiceedit);

  const [imgDelete, setImgDelete] = useState('');


  const updateStateChoice = (index) => (e) => {
    const answerBefore = answerRef.current.value;
    const newArray = tempChoice.map((item, i) => {
      if (index === i) {
          return { ...item, choice: e.target.value };
        } else {
          return item;
        }
      });
      
      const trueChoice = []
      setTempChoice(newArray)
      newArray.map((choices) => {
        trueChoice.push(choices.choice)
      })
      
      if (index == data.choice.indexOf(answerBefore)) {
        setData('actual_answer', e.target.value)
      };

      setData('choice', trueChoice)
    };

  const updateStateEditChoice = (index) => (e) => {
    const newArrayEdit = tempEditChoice.map((item, i) => {
      if (index === i) {
        return { choice: e.target.value };
      } else {
        return item;
      }
    });

    if (index == choiceEdit.indexOf(actualAnswerEdit)) {
      setEditActualAnswer(e.target.value)
    }

    const trueChoiceEdit = []
    setTempEditChoice(newArrayEdit)
    console.log(newArrayEdit)
    newArrayEdit.map((choices) => {
      trueChoiceEdit.push(choices.choice)
    })
    setEditChoice(trueChoiceEdit)
    console.log(choiceEdit)
  };

  function blobUrl() {
    const url = URL.createObjectURL(data.image)
    return url
  }

  function blobUrlEssay() {
    const url = URL.createObjectURL(image)
    return url
  }

  function blobUrlEdit() {
    if (imageEdit != null) {
      const url = URL.createObjectURL(imageEdit)
      return url
    } else {
      return ''
    }
  }

  function submit(e) {
    e.preventDefault()
    data.actual_answer = answerRef.current.value;
    post(route('admin.create-soal', data, {
      _method: 'POST'
    }));
  }

  function editSoal(e) {
    e.preventDefault()
    const subjectEdit = subject_id
    const edit = {
      id, imageEdit, questionEdit, subjectEdit, choiceEdit, actualAnswerEdit, isDeleteImg, pointEdit
    }

    router.post('/dashboard/soal/update-soal', edit)
  }

  function submitEssay(e) {
    e.preventDefault()

    const edit = {
      subject_id, question, choice, image, is_essay, actual_answer, point,
      // exam_started, exam_ended, exam_duration, subjects
    }

    router.post('/dashboard/soal/add-soal', edit)
  }



  return (
    <div className='min-h-screen'>
      <Head title={`${title}  ${subject}`} />

      <div className="drawer lg:drawer-open min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-neutral min-h-screen">
          <Navbar user={auth.user} />
          <div className='mx-6 mt-6 min-h-screen'>
            <div className='flex justify-between'>
              <h1 className='font-bold'>Daftar Soal Ujian {subject}</h1>



              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <div>
                {exam_type == 'normal' ?
                <>
                  <PrimaryButton onClick={() => { document.getElementById('create_data_essay').showModal() }}>Tambah soal essay</PrimaryButton>
                  <PrimaryButton onClick={() => { document.getElementById('create_data').showModal() }}>Tambah soal pilihan ganda</PrimaryButton>
                </>
                : 
                <>
                  <PrimaryButton onClick={() => { document.getElementById('create_data').showModal() }}>Tambah soal</PrimaryButton>                
                </>
                }

              </div>

              <dialog id="create_data" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Masukkan data soal</h3>

                  <form onSubmit={submit}>
                    {/* Gambar Soal */}
                    <div className="">
                      {data.image ?
                        <div className='flex justify-center'>
                          <img src={blobUrl()} alt="Gambar" className='h-60' />
                        </div>
                        : ""}
                      <InputLabel htmlFor="image" value="Gambar Soal" className="my-2" />
                      <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setData('image', e.target.files[0])} />
                      <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Question */}
                    <div className="mt-2">
                      <InputLabel htmlFor="question" value={exam_type == 'hilang angka' ? "Masukkan digit angka soal" : "Pertanyaan"} />
                      <TextInput
                        type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.question} onChange={e => setData('question', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key) && exam_type == 'hilang angka') {
                            event.preventDefault();
                          }
                        }}
                      />

                      <InputError message={errors.question} className="mt-2" />
                    </div>

                    <div className="mt-2">
                      <InputLabel htmlFor="point" value="Point (masukkan nilai berupa angka untuk soal ini)" />
                      <TextInput
                        type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.point} onChange={e => setData('point', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />

                      <InputError message={errors.point} className="mt-2" />
                    </div>


                    {/* A Choice */}
                    <div className="mt-2">
                      <InputLabel htmlFor="choice[0]" value="Pilihan jawaban A" />
                      <TextInput
                        id="choice[0]"
                        type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[0]} onChange={updateStateChoice(0)}
                      />

                      {errors["choice.0"] && <div className='text-red-600'>{errors["choice.0"].slice(-6) == "value." ? "Jawaban A mempunyai duplikat yang sama" : "Pilihan jawaban A harus diisi"}</div>}
                    </div>

                    {/* Choice B */}
                    <div className="mt-2">
                      <InputLabel htmlFor="choice[1]" value="Pilihan jawaban B" />
                      <TextInput
                        id="choice[1]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[1]} onChange={updateStateChoice(1)}
                      />

                      {errors["choice.1"] && <div className='text-red-600'>{errors["choice.1"].slice(-6) == "value." ? "Jawaban B mempunyai duplikat yang sama" : "Pilihan jawaban B harus diisi"}</div>}
                    </div>

                    {/* Choice C */}
                    <div className="mt-2">
                      <InputLabel htmlFor="choice[2]" value="Pilihan jawaban C" />
                      <TextInput
                        id="choice[2]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[2]} onChange={updateStateChoice(2)}
                      />

                      {errors["choice.2"] && <div className='text-red-600'>{errors["choice.2"].slice(-6) == "value." ? "Jawaban C mempunyai duplikat yang sama" : "Pilihan jawaban C harus diisi"}</div>}
                    </div>

                    {/* Choice D */}
                    <div className="mt-2">
                      <InputLabel htmlFor="choice[3]" value="Pilihan jawaban D" />
                      <TextInput
                        id="choice[3]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[3]} onChange={updateStateChoice(3)}
                      />

                      {errors["choice.3"] && <div className='text-red-600'>{errors["choice.3"].slice(-6) == "value." ? "Jawaban D mempunyai duplikat yang sama" : "Pilihan jawaban D harus diisi"}</div>}
                    </div>

                    {/* Choice E */}
                    <div className="mt-2">
                      <InputLabel htmlFor="choice[4]" value="Pilihan jawaban E" />
                      <TextInput
                        id="choice[4]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[4]} onChange={updateStateChoice(4)}
                      />

                      {errors["choice.4"] && <div className='text-red-600'>{errors["choice.4"].slice(-6) == "value." ? "Jawaban E mempunyai duplikat yang sama" : "Pilihan jawaban E harus diisi"}</div>}
                    </div>


                    {/* Jawaban Soal */}
                    <div className="mt-2">
                      <InputLabel htmlFor="actual_answer" value="Jawaban soal" />
                      <select ref={answerRef} className="bg-white select select-primary w-full max-w-xs"
                        id='actual_answer' onChange={e => setData('actual_answer', e.target.value)}>
                        <option value="" disabled selected>Pilih jawaban untuk soal</option>
                        {data.choice.map((data, i) =>
                          <option key={i}>{data}</option>
                        )}
                      </select>
                      <InputError message={errors.actual_answer} className="mt-2" />

                    </div>





                    <div className='flex justify-between'>
                      <button type="submit" className="btn btn-secondary mt-6" disabled={processing}>Submit</button>

                      {flash.message?.substr(0, 11) == 'suksesinput' && showSuccess ?
                        <div className="alert alert-success mx-4 mt-5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Soal berhasil ditambah</span>
                        </div> :
                        ""
                      }
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>Cancel</button>
                        </form>
                      </div>
                    </div>

                  </form>

                </div>
              </dialog>

              <dialog id="create_data_essay" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Masukkan data soal</h3>

                  <form onSubmit={submitEssay}>
                    <div className="">
                      {image ?
                        <div className='flex justify-center'>
                          <img src={blobUrlEssay()} alt="Gambar" className='h-60' />
                        </div>
                        : ""}

                      <InputLabel htmlFor="image" value="Gambar Soal" className="my-2" />
                      <input id="image" type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setImage(e.target.files[0])} />
                      <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Question */}
                    <div className="mt-2">
                      <InputLabel htmlFor="question" value="Pertanyaan" />
                      <TextInput id="question" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={question} onChange={e => setQuestion(e.target.value)} />
                      <InputError message={errors.question} className="mt-2" />
                    </div>

                    {/* Jawaban Soal */}
                    <div className="mt-2">
                      <InputLabel htmlFor="actual_answer" value="Jawaban soal" />
                      <TextInput id="question" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" onChange={e => setActualAnswer(e.target.value)} />
                      <InputError message={errors.actual_answer} className="mt-2" />

                    </div>
                    {/* <label className="label">
                      <span className="label-text font-bold">Subject</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={subject} onChange={e => setSubject(e.target.value)} />
                    {errors.subject && <div className='text-red-600'>{errors.subject}</div>}
 */}
                    <div className="mt-2">
                      <InputLabel htmlFor="point" value="Point (Masukkan angka antara 1-9)" />

                      <TextInput id="point" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" onChange={e => setPoint(e.target.value)} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                      <InputError message={errors.point} className="mt-2" />

                    </div>


                    <div className='flex justify-between'>
                      <button type="submit" className="btn btn-secondary mt-6" disabled={processing}>Submit</button>

                      {flash.message?.substr(0, 11) == 'suksesinput' && showSuccess ?
                        <div className="alert alert-success mx-4 mt-5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Soal berhasil ditambah</span>
                        </div> :
                        ""
                      }
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-primary" onClick={() => { setShowSuccess(false) }}>Cancel</button>
                        </form>
                      </div>
                    </div>

                  </form>

                </div>
              </dialog>

            </div>



            {/* content */}
            <section className="mt-12">

              {exam.map((data, i) => {
                if (!data.is_essay) {
                  return (
                    <div className="card mx-5 my-3  bg-secondary text-primary-content" key={i}>
                      <div className="card-body">
                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-lg max-h-lg  rounded-md' />}
                        <p className="w-4/5">{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
                        <ul>
                          <li className='font-medium'>A. {data.choice[0]}</li>
                          <li className='font-medium'>B. {data.choice[1]}</li>
                          <li className='font-medium'>C. {data.choice[2]}</li>
                          <li className='font-medium'>D. {data.choice[3]}</li>
                          <li className='font-medium'>E. {data.choice[4]}</li>
                        </ul>
                        <div className="card-actions justify-start">
                          <h1>Jawaban : <strong> {data.actual_answer}</strong></h1>
                        </div>

                        <div className="card-actions justify-end">
                          <PrimaryButton onClick={() => {
                            setEditPoint(data.point)
                            setImgDelete('');
                            setEditIsEssay(false);
                            setTempEditChoice([
                              {
                                choice: data.choice[0],
                              },
                              {
                                choice: data.choice[1],
                              },
                              {
                                choice: data.choice[2],
                              },
                              {
                                choice: data.choice[3],
                              },
                              {
                                choice: data.choice[4],
                              },
                            ])
                            const choicess = data.choice;
                            setIdEdit(data.id);
                            setEditQuestion(data.question);
                            setEditChoice(choicess);
                            setEditActualAnswer(data.actual_answer);
                            document.getElementById('edit_data' + data.id.toString()).showModal()
                          }
                          }>Edit</PrimaryButton> <PrimaryButton onClick={() => confirmDelete(data.id)} >Delete</PrimaryButton>
                        </div>

                        <dialog id={"edit_data" + data.id} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit data soal</h3>

                            <form onSubmit={editSoal}>
                              {/* Gambar Soal */}
                              <div className="">
                                {imageEdit ?
                                  <div className='flex justify-center'>
                                    <img src={blobUrlEdit()} alt="Gambar" className='max-h-60' />
                                  </div>
                                  :
                                  <div className='flex justify-center'>
                                    <img src={'/storage/' + data.image + imgDelete} className='max-h-60' />
                                  </div>
                                }


                                <InputLabel htmlFor="image" value="Gambar Soal" className="my-2" />
                                <input id='image' type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setEditImage(e.target.files[0])} />
                                <a className='mx-3 btn btn-primary' onClick={() => {
                                  setEditImage(null)
                                  setImgDelete('a')
                                  setIsDeleteImg(true)
                                }}><IoTrashSharp /></a>
                              </div>

                              {/* Question */}
                              <div className="mt-2">
                                <InputLabel htmlFor="question" value="Pertanyaan" />
                                <TextInput
                                  id="question" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={questionEdit} onChange={(question) => setEditQuestion(question.target.value)}
                                />
                              </div>

                              <div className="mt-2">
                                <InputLabel htmlFor="point" value="Point (Masukkan angka antara 1-9)" />

                                <TextInput id="point" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={pointEdit} onChange={(point) => setEditPoint(point.target.value)} onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }} />
                              </div>

                              {/* A Choice */}
                              <div className="mt-2">
                                <InputLabel htmlFor="choice[0]" value="Pilihan jawaban A" />
                                <TextInput
                                  id="choice[0]"
                                  type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[0]} onChange={updateStateEditChoice(0)}
                                />

                              </div>


                              {/* Choice B */}
                              <div className="mt-2">
                                <InputLabel htmlFor="choice[1]" value="Pilihan jawaban B" />
                                <TextInput
                                  id="choice[1]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[1]} onChange={updateStateEditChoice(1)}
                                />
                              </div>

                              {/* Choice C */}
                              <div className="mt-2">
                                <InputLabel htmlFor="choice[2]" value="Pilihan jawaban C" />
                                <TextInput
                                  id="choice[2]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[2]} onChange={updateStateEditChoice(2)}
                                />

                                {errors["choice.2"] && <div className='text-red-600'>{errors["choice.2"].slice(-6) == "value." ? "Jawaban C mempunyai duplikat yang sama" : "Pilihan jawaban C harus diisi"}</div>}
                              </div>

                              {/* Choice D */}
                              <div className="mt-2">
                                <InputLabel htmlFor="choice[3]" value="Pilihan jawaban D" />
                                <TextInput
                                  id="choice[3]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[3]} onChange={updateStateEditChoice(3)}
                                />

                                {errors["choice.3"] && <div className='text-red-600'>{errors["choice.3"].slice(-6) == "value." ? "Jawaban D mempunyai duplikat yang sama" : "Pilihan jawaban D harus diisi"}</div>}
                              </div>

                              {/* Choice E */}
                              <div className="mt-2">
                                <InputLabel htmlFor="choice[3]" value="Pilihan jawaban E" />
                                <TextInput
                                  id="choice[4]" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[4]} onChange={updateStateEditChoice(4)}
                                />

                                {errors["choice.4"] && <div className='text-red-600'>{errors["choice.4"].slice(-6) == "value." ? "Jawaban E mempunyai duplikat yang sama" : "Pilihan jawaban E harus diisi"}</div>}
                              </div>


                              {/* Jawaban Soal */}
                              <div className="mt-2">
                                <InputLabel htmlFor="actual_answer" value="Jawaban soal" />
                                <select className="bg-white select select-primary w-full max-w-xs"
                                  id='actual_answer' onChange={(answer) => setEditActualAnswer(answer.target.value)}>
                                  {choiceEdit.map((choice, i) => {
                                    if (i == data.choice.indexOf(data.actual_answer)) {
                                      return (<option key={i} selected>{choice}</option>)
                                    } else {
                                      return (<option key={i}>{choice}</option>)
                                    }
                                  }
                                  )}
                                </select>
                                <InputError message={errors.actual_answer} className="mt-2" />

                              </div>



                              {flash.message?.substr(0, data.id.toString().length) == data.id.toString() && showSuccess ?
                                <div className="alert alert-success mx-4 mt-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                  <span>Soal berhasil diedit</span>
                                </div> :
                                ""
                              }
                              <div className='flex justify-evenly'>
                                <button type="submit" className="btn text-white bg-primary mt-6">Simpan</button>

                                <div className="modal-action">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn bg-secondary/70" onClick={() => {
                                      setEditPoint(data.point);
                                      setIsDeleteImg(false)
                                      setImgDelete('');
                                      setEditImage(null);
                                      setShowSuccess(false);
                                      setEditQuestion(data.question);
                                      setEditChoice(data.choice);
                                      setEditActualAnswer(data.actual_answer);
                                      console.log(examState);
                                      console.log(flash.message)
                                    }}>Tutup</button>
                                  </form>
                                </div>
                              </div>

                            </form>

                          </div>
                        </dialog>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="card mx-5 my-3 bg-secondary text-primary-content" key={i}>
                      <div className="card-body">
                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-lg max-h-lg  rounded-md ' />}
                        <p className="w-4/5">{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
                        <div className="card-actions justify-start">
                          {/* <button className="btn">Buy Now</button> */}
                          <h1>Jawaban : <strong>{data.actual_answer}</strong></h1>
                        </div>

                        <div className="card-actions justify-end">
                          {/* <button className="btn">Buy Now</button> */}
                          <PrimaryButton onClick={() => {
                            setEditPoint(data.point);
                            setEditActualAnswer(data.actual_answer);
                            setEditIsEssay(true);
                            setIdEdit(data.id);
                            setEditQuestion(data.question);
                            setEditChoice(["soal essay"]);
                            document.getElementById('edit_data' + data.id.toString()).showModal()
                          }
                          }>Edit</PrimaryButton> <PrimaryButton onClick={() => { confirmDelete(data.id) }} >Delete</PrimaryButton>
                        </div>

                        <dialog id={"edit_data" + data.id} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit data soal</h3>

                            <form onSubmit={editSoal}>
                              {/* Gambar Soal */}
                              <div className="">
                                {imageEdit ?
                                  <div className='flex justify-center'>
                                    <img src={blobUrlEdit()} alt="Gambar" className='max-h-60' />
                                  </div>
                                  :
                                  <div className='flex justify-center'>
                                    <img src={'/storage/' + data.image + imgDelete} className='max-h-60' />
                                  </div>
                                }
                                <InputLabel htmlFor="imageEdit" value="Gambar Soal" className="my-2" />
                                <input id="imageEdit" type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setEditImage(e.target.files[0])} />
                                <a className='btn btn-primary mx-3' onClick={() => {
                                  setEditImage(null)
                                  setImgDelete('a')
                                  setIsDeleteImg(true)
                                }}><IoTrashSharp /></a>
                              </div>

                              {/* Question */}
                              <div className="mt-2">

                                <InputLabel htmlFor="question" value="Pertanyaan" />
                                <TextInput type="text" className="bg-white mb-2 input input-bordered input-primary w-full" defaultValue={questionEdit} onChange={(question) => setEditQuestion(question.target.value)} />
                              </div>

                              <div className="mt-2">
                                <InputLabel htmlFor="point" value="Point (Masukkan angka antara 1-9)" />
                                <TextInput type="text" className="bg-white mb-2 input input-bordered input-primary w-full" defaultValue={pointEdit} onChange={(point) => setEditPoint(point.target.value)} onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }} />
                              </div>

                              <div className="mt-2">
                                <InputLabel htmlFor="actual_answer" value="Jawaban soal" />
                                <TextInput id="actual_answer" type="text" className="bg-white mb-2 input input-bordered input-primary w-full" defaultValue={actualAnswerEdit}
                                />
                                <InputError message={errors.actual_answer} className="mt-2" />

                              </div>

                              {flash.message?.substr(0, data.id.toString().length) == data.id.toString() && showSuccess ?
                                <div className="alert alert-success mx-4 mt-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                  <span>Soal berhasil diedit</span>
                                </div> :
                                ""
                              }
                              <div className='flex justify-evenly'>
                                <button type="submit" className="btn bg-primary glass text-secondary mt-6">Simpan</button>

                                <div className="modal-action">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn bg-secondary/70 glass" onClick={() => {
                                      setEditPoint(data.point);
                                      setIsDeleteImg(false)
                                      setEditImage(null);
                                      setShowSuccess(false);
                                      setImgDelete('');
                                    }}>Tutup</button>
                                  </form>
                                </div>
                              </div>

                            </form>

                          </div>
                        </dialog>
                      </div>
                    </div>
                  )
                }
              }
              )}

            </section>

            {/* end of content               */}
          </div>

        </div>
        <AdminDrawer></AdminDrawer>


      </div>
    </div>
  )
}