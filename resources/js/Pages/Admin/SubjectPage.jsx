import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react";
import { router } from '@inertiajs/react';
import { FiEye } from "react-icons/fi";
import moment from "moment/min/moment-with-locales";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import no_data from "@/../assets/no_data.svg";


export default function SubjectPage({ auth, flash, title, subjects }) {
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (flash.message?.substr(0, 11) != null) {
            setShowSuccess(true)
        }
    }, [flash.message]);

    function submit(e) {
        e.preventDefault()
        post(route('admin.update-subject', data, {
            _method: 'POST',
            preserveScroll: true,
            onSuccess: () => {
                reset('id', 'name', 'exam_duration', 'exam_ended', 'exam_started', 'image', 'is_available', 'oldImage', 'exam_type');
                clearErrors();
            }
        }));
    }

    function submitCreate(e) {
        e.preventDefault()
        post(route('admin.create-subject', data, {
            _method: 'POST',
            preserveScroll: true,
            onSuccess: () => {
                reset('id', 'name', 'exam_duration', 'exam_ended', 'exam_started', 'image', 'is_available', 'oldImage', 'exam_type');
                clearErrors();
                clear
            }
        }));
    }

    const { data, setData, post, patch, processing, errors, reset, recentlySuccessful } = useForm({
        id: '',
        name: '',
        exam_duration: '',
        exam_started: '',
        exam_ended: '',
        exam_type: 'normal',
        image: null,
        is_available: null,

        // Old Image
        oldImage: null,
        exam_dir: null,
    })



    // function blobUrl() {
    //   const url = URL.createObjectURL(data.image)
    //   return url
    // }

    // function blobUrlEssay() {
    //   const url = URL.createObjectURL(image)
    //   return url
    // }

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Subjek yang sudah dihapus tidak bisa dikembalikan lagi",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, saya yakin!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.delete-subject', { id: id }), { preserveScroll: true })
            }
        })
    }

    moment.locale('id')

    function previewImage(e) {
        const image = document.querySelector('#image')
        const imgPreview = document.querySelector('.img-preview')
        setData('image', e.target.files[0])
        const Reader = new FileReader();
        Reader.readAsDataURL(image.files[0]);
        Reader.onload = function (e) {
            imgPreview.src = e.target.result;
        };
    };
    const [isEdit, setIsEdit] = useState(false)

    function openDialog(subject) {
        if (subject != null) {
            setIsEdit(true)
            setData({
                id: subject.id,
                name: subject.name,
                exam_duration: subject.exam_duration,
                exam_started: subject.exam_started,
                exam_ended: subject.exam_ended,
                image: null,
                is_available: subject.is_available,
                exam_type: subject.exam_type,

                // Old Image
                oldImage: subject.image,
                exam_dir: subject.exam_dir
            })

            document.getElementById('upsert').showModal()
        } else {
            reset('id', 'name', 'exam_duration', 'exam_ended', 'exam_started', 'image', 'is_available', 'oldImage', 'exam_type', 'exam_dir');

            setData({
                id: '',
                name: '',
                exam_duration: '',
                exam_started: '',
                exam_ended: '',
                exam_type: 'normal',
                image: null,
                is_available: true,

                // Old Image
                oldImage: null,
                exam_dir: null,
            })
            setIsEdit(false)
            document.getElementById('upsert').showModal()
        }


    }


    function cancel(e) {
        e.preventDefault();
        setIsEdit(false)
        reset('id', 'name', 'exam_duration', 'exam_ended', 'exam_started', 'image', 'is_available', 'oldImage', 'exam_type', 'exam_dir');

    }

    setTimeout(function () {
        $('#successMessage').fadeOut('fast').remove();
    }, 30000); // <-- time in milliseconds


    return (
        <div className='min-h-screen'>
            <Head title={title} />

            <div className="drawer lg:drawer-open min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral min-h-screen">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 min-h-screen'>

                        {/* content */}
                        <div className='flex justify-between'>
                            <h1 className='font-bold'>Daftar Subject Ujian</h1>
                            <PrimaryButton onClick={() => { openDialog(null) }} >Tambah Materi Ujian
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            {
                                subjects.length ?
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Nama Materi Ujian</th>
                                                <th>Banyak Soal</th>
                                                <th>Durasi</th>
                                                <th>Tanggal Ujian Dimulai</th>
                                                <th>Tanggal Ujian Berakhir</th>
                                                <th>Exam directory</th>
                                                <th>Tanggal Dibuat</th>
                                                <th>Terakhir Diupdate</th>
                                                <th className='pl-16'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>

                                            {

                                                subjects.map((subject, i) => {

                                                    return (
                                                        <tr key={i}>
                                                            <td>
                                                                <div className="flex items-center gap-3">
                                                                    {subject.image ?
                                                                        <div className="avatar">
                                                                            <div className="mask mask-squircle w-12 h-12">
                                                                                <img src={"/storage/" + subject.image} alt="Materi Ujian" />
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        ""
                                                                    }
                                                                    <div>
                                                                        <div className="font-bold">{subject.name}</div>
                                                                        <div className="text-sm opacity-50">Tryout {subject.exam_type}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {subject.exam.length}
                                                                <br />
                                                            </td>
                                                            <td>
                                                                <>{subject.exam_duration} Menit</>
                                                            </td>

                                                            <td className="text-xs ">
                                                                <p className="mx-2">{moment(subject.exam_started).format('LL')}</p>
                                                                {/* <p className="mx-2">Pukul {moment(subject.exam_started).format('HH:mm')}</p> */}
                                                            </td>

                                                            <td className="text-xs">
                                                                <p className="mx-2">{moment(subject.exam_ended).format('LL')}</p>
                                                                {/* <p className="mx-2">Pukul {moment(subject.exam_ended).format('HH:mm')}</p> */}
                                                            </td>

                                                            <td className="text-xs">
                                                                <p className="mx-2">{subject.exam_dir}</p>
                                                            </td>

                                                            <td className="text-xs">
                                                                {moment(subject.created_at).format('L')}
                                                            </td>
                                                            <td className='text-xs'>
                                                                {moment(subject.updated_at).fromNow()}
                                                            </td>

                                                            <td className="flex justify-start">
                                                                {/* Button View */}
                                                                <Link href={route('admin.soal-show', { id: subject.id, name: subject.name })} subject={{ id: subject.id, name: subject.name }} >
                                                                    <button className='bg-slate-500/80 px-8 -ml-10 scale-[0.6] btn glass'>
                                                                        <FiEye className='scale-[2.4] stroke-emerald-600/70'
                                                                            value={{ color: '#16a34a', size: '50px' }}
                                                                        >
                                                                        </FiEye>
                                                                    </button>
                                                                </Link>

                                                                {/* Button Edit */}
                                                                <button onClick={() => { openDialog(subject) }} className='bg-slate-500/80  scale-[0.6] -ml-5 btn glass'>
                                                                    <IconContext.Provider value={{ color: '#FFA50A', size: '50px' }}
                                                                    >
                                                                        <FaRegEdit className='max-h-7' />
                                                                    </IconContext.Provider>
                                                                </button>

                                                                {/* Create Or Edit */}
                                                                {/* Dialog Edit Start */}
                                                                <dialog id="upsert" className="modal mx-auto">
                                                                    <div className="modal-box bg-base-100/90">
                                                                        <form onSubmit={(isEdit ? submit : submitCreate)} method={isEdit ? 'post' : 'post'}>
                                                                            <div>
                                                                                <h2 className="text-3xl font-bold text-primary">{isEdit ? 'Edit ' : 'Tambah '} Subjek</h2>
                                                                                <p className="my-2 text-base">Masukkan data Subjek</p>
                                                                                <InputLabel htmlFor="name" value="Nama" />

                                                                                {/* Nama */}
                                                                                <TextInput
                                                                                    id="name"
                                                                                    type="text"
                                                                                    name="name"
                                                                                    className="mt-1 block w-full"
                                                                                    defaultValue={isEdit ? data.name : ""}
                                                                                    onChange={(e) => setData('name', e.target.value)}
                                                                                />

                                                                                <InputError message={errors.name} className="mt-2" />
                                                                            </div>

                                                                            {/* Exam Started */}

                                                                            <div className="mt-4">
                                                                                <InputLabel htmlFor="exam_started" value="Tanggal Dimulai Ujian" />
                                                                                <TextInput
                                                                                    id="exam_started"
                                                                                    type="date"
                                                                                    defaultValue={isEdit ? data.exam_started.substr(0, 10) : ""}
                                                                                    name="exam_started"
                                                                                    className="mt-1 block w-full "
                                                                                    onChange={(e) => setData('exam_started', e.target.value)}
                                                                                />

                                                                                <InputError message={errors.exam_started} className="mt-2" />
                                                                            </div>

                                                                            {/* Exam Ended) */}
                                                                            <div className="mt-4">
                                                                                <InputLabel htmlFor="exam_ended" value="Tanggal Berakhir Ujian" />
                                                                                <TextInput
                                                                                    id="exam_ended"
                                                                                    type="date"
                                                                                    name="exam_ended"
                                                                                    defaultValue={isEdit ? data.exam_ended.substr(0, 10) : ""}
                                                                                    className="mt-1 block w-full "
                                                                                    onChange={(e) => setData('exam_ended', e.target.value)}
                                                                                />

                                                                                <InputError message={errors.exam_ended} className="mt-2" />
                                                                            </div>

                                                                            {/* Exam Duration) */}
                                                                            <div className="mt-4">
                                                                                <InputLabel htmlFor="exam_duration" value="Masukkan Durasi Ujian(dalam menit)" />
                                                                                <TextInput
                                                                                    id="exam_duration"
                                                                                    type="text"
                                                                                    name="exam_duration"
                                                                                    defaultValue={isEdit ? data.exam_duration : ""}
                                                                                    className="mt-1 block w-full"
                                                                                    onChange={(e) => setData('exam_duration', e.target.value)}
                                                                                />

                                                                                <InputError message={errors.exam_duration} className="mt-2" />
                                                                            </div>

                                                                            {/* Exam Directory) */}
                                                                            <div className="mt-4">
                                                                                <InputLabel htmlFor="exam_dir" value="Tryout Directory" />
                                                                                <TextInput
                                                                                    id="exam_dir"
                                                                                    type="text"
                                                                                    name="exam_dir"
                                                                                    defaultValue={isEdit ? data.exam_dir : ""}
                                                                                    className="mt-1 block w-full "
                                                                                    onChange={(e) => setData('exam_dir', e.target.value)}
                                                                                />

                                                                                <InputError message={errors.exam_dir} className="mt-2" />
                                                                            </div>
                                                                            
                                                                            {/* exam type */}
                                                                            {isEdit ? 
                                                                            "" 
                                                                            : 
                                                                            <div className="mt-4">
                                                                                <InputLabel htmlFor="exam_type" value="Masukkan Tipe Tryout" />
                                                                                <select className="border-gray-300 mt-1 border-t-primary border-l-primary border-r-secondary border-b-secondary focus:border-none focus:border-primary focus:ring-yellow-600 rounded-md shadow-sm w-full" name="exam_type" onChange={(e) => setData('exam_type', e.target.value)}>
                                                                                    <option value="normal" selected>Normal</option>
                                                                                    <option value="hilang angka" >Hilang angka</option>
                                                                                </select>

                                                                                <InputError message={errors.exam_type} className="mt-2" />
                                                                            </div>                                                         
                                                                            }                                                   

                                                                            
                                                                            {/* Image */}
                                                                            <div className="mt-4">

                                                                                <InputLabel className='my-2' htmlFor="image" value="Gambar Materi Ujian(opsional)" />
                                                                                <input type="hidden" name='oldImage' id='oldImage' value={data.oldImage} />
                                                                                {
                                                                                    data.oldImage ?
                                                                                        <img src={"/storage/" + data.oldImage} className=' w-72 h-72 img-preview' />
                                                                                        :
                                                                                        ""
                                                                                }

                                                                                <input type="file" name='image' id='image'
                                                                                    onChange={previewImage}
                                                                                    className="my-2 block file-input font-thin text-sm file-input-bordered file-input-primary w-full max-w-xs" />
                                                                                <InputError className="my-2" message={errors.image} />
                                                                            </div>

                                                                            { isEdit ?
                                                                            <div className="mt-4">
                                                                                <Link href={route('admin.soal-show', { id: data.id, name: data.name })} data={{ id: data.id, name: data.name }}>
                                                                                    <PrimaryButton className="-ml-2">
                                                                                        Edit Soal
                                                                                        {/* {isEdit ? (subject.exam.length ? 'Edit Soal' : 'Tambah Soal') : 'Tambah Soal'} */}
                                                                                    </PrimaryButton>
                                                                                </Link>
                                                                            </div>
                                                                            :
                                                                            ""
                                                                            }

                                                                            {flash.message &&
                                                                                <div className="alert bg-primary/40 mx-auto mt-5">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                                    <span>{flash.message}</span>
                                                                                </div>
                                                                            }
                                                                            <div className='flex justify-evenly'>
                                                                                <PrimaryButton type="submit" className="scale-[1] mt-6" disabled={processing}>Submit</PrimaryButton>
                                                                                <div className="modal-action">
                                                                                    <form onSubmit={(e) => cancel(e)} method="dialog">
                                                                                        {/* if there is a button in form, it will close the modal */}
                                                                                        <PrimaryButton className="scale-[0.97]  bg-red-500 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                                        </svg>
                                                                                            Cancel</PrimaryButton>
                                                                                    </form>
                                                                                </div>
                                                                            </div>

                                                                        </form>

                                                                    </div>
                                                                </dialog>
                                                                {/* Dialog Edit End */}

                                                                {/* Button Delete */}
                                                                <button onClick={() => confirmDelete(subject.id)} className='transition-all bg-slate-500/80 -ml-5 scale-[0.6] btn glass '>
                                                                    <IconContext.Provider className=""
                                                                        value={{ color: '#ef4444', size: '50px' }}
                                                                    >
                                                                        <IoTrashSharp className='max-h-7' />
                                                                    </IconContext.Provider>

                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                        {/* foot */}
                                        <tfoot>
                                            <tr>
                                                <th>Nama Materi Ujian</th>
                                                <th>Banyak Soal</th>
                                                <th>Durasi</th>
                                                <th>Tanggal Ujian Dimulai</th>
                                                <th>Tanggal Ujian Berakhir</th>
                                                <th>Exam directory</th>
                                                <th>Tanggal Dibuat</th>
                                                <th>Terakhir Diupdate</th>
                                                <th className='pl-16'>Aksi</th>
                                            </tr>
                                        </tfoot>

                                    </table>
                                    :
                                    <div className="my-auto w-full ">
                                        <img className='w-40 h-32 mx-auto pt-7 mt-16' src={no_data} alt="no data" srcset="" />
                                        <p className='text-center mt-3 text-sm text-slate-600'>Belum ada Materi Ujian </p>
                                    </div>
                            }

                        </div>
                        {flash.message &&
                            <div className="alert bg-success mx-auto mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{flash.message}</span>
                            </div>
                        }



                        {/* Dialog */}

                        {/* Dialog End */}


                    </div>
                </div>
                <AdminDrawer />


            </div>
        </div>
    )
}
