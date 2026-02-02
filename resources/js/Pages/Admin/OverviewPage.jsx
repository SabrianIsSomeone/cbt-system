import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import PrimaryButton from '@/Components/PrimaryButton';
import profile from '@/../assets/profile.png';
import Swal from 'sweetalert2'
import { FiEye } from "react-icons/fi";
import moment from "moment/min/moment-with-locales";
import no_data from "@/../assets/no_data.svg";




export default function AdminPagePeserta({ auth, user, flash, title, }) {

    const { data, setData, post, patch, processing, errors } = useForm({
        name: '',
        nim: '',
        email: '',
        password: '12345678',
        password_confirmation: '',
    })
    console.log("isi dari data" + data.name + data.email + data.password)
    function submit(e) {
        e.preventDefault()
        post(route('admin.create-peserta', data, {
            _method: 'post'
        }));
    }
    const [dataEdit, setDataEdit] = useState({
        id: '',
        name: '',
        nim: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    function openEditDialog(id, _name, nim, email,) {
        setDataEdit({
            id: id,
            name: _name,
            nim: nim,
            email: email,
            // Dk bisa nampilin password lol
        });
        document.getElementById('edit_data :' + id.toString()).showModal()
    }

    function submitEdit(e) {
        console.log("tes submit edit")
        e.preventDefault()
        patch(route('admin.update-peserta', dataEdit, {
            _method: 'patch',

        }));
    }

    console.log(`isi dataEdit ${dataEdit.name}`)
    console.log(`isi Flash message sekarang ${flash.message}`)

    // Delete Confirmation
    const confirmDelete = (id) => {
        console.log(`is id cuy ${id}`);
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
                router.delete(route('admin.delete-peserta', { id: id }), { preserveScroll: true })
            }
        })
    }


    // moment.format('LLL');
    moment.locale('id')
    return (

        <div className='min-h-screen'>
            <Head title={title} />
            <div className="drawer lg:drawer-open min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral min-h-screen">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 min-h-screen'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold py-3'>Data Peserta Ujian</h1>

                        </div>
                        {/* content */}

                        <div className="overflow-x-auto">
                            {
                                user.length ?
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email/NIM</th>
                                                <th>Status Pengerjaan Tes</th>
                                                <th>Selesai Dikerjakan</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {user.map((data, i) => {
                                                var answered = data.answered
                                                console.log('isi answered')
                                                console.log(answered)
                                                // console.log(answered[0].updated_at)
                                                // console.log(`isi password dari user ke ${i} == ${data.password}`)
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={profile} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{data.name}</div>
                                                                    <div className="text-sm opacity-50">Universitas Jambi</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {data.nim}
                                                            <br />
                                                            <span className="badge badge-ghost badge-sm">{data.email}</span>
                                                        </td>
                                                        <td>
                                                            {answered.length ?
                                                                <>Sudah Selesai</>
                                                                :
                                                                <>Belum selesai</>
                                                            }

                                                        </td>

                                                        <td>
                                                            {/* {moment(data.answer.updated_at).locale('id').fromNow()} */}
                                                            {/* Ngebug hari waktuny dk sesuai, bahkan pake answered[0].updated_at */}
                                                            {
                                                                answered.length
                                                                    ?
                                                                    // moment(answered[0].updated_at).format('LLL')
                                                                    moment(answered[0].updated_at).fromNow()
                                                                    :
                                                                    '_'
                                                            }
                                                        </td>
                                                        <td className="flex justify-start">
                                                            {/* Button View */}
                                                            <Link href={route('admin.overview-subject', { user_id: data.id, })} >
                                                                <PrimaryButton>
                                                                    <strong className='text-white'>Lihat</strong>
                                                                    <FiEye className='scale[2.4] stroke-secondary-500'
                                                                    // value={{ color: '#16a34a', size: '50px' }}
                                                                    >
                                                                        {/* <FaUserEdit className='max-h-7' /> */}
                                                                    </FiEye>
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
                                                <th>Name</th>
                                                <th>Email/NIM</th>
                                                <th>Status Pengerjaan Tes</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </tfoot>

                                    </table>
                                    :
                                    <div className="my-auto w-full ">
                                        <img className='w-40 h-32 mx-auto pt-7 mt-3' src={no_data} alt="no data" srcset="" />
                                        <p className='text-center mt-3 text-sm text-slate-600'>Belum ada Peserta yang ditambahkan. </p>
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