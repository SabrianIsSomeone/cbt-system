import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import PrimaryButton from '@/Components/PrimaryButton';
import { IoTrashSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaUserEdit } from "react-icons/fa";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import profile from '@/../assets/profile.png';
import Swal from 'sweetalert2'
import { FiEye } from "react-icons/fi";
import no_data from "@/../assets/no_data.svg";
import moment from "moment/min/moment-with-locales";


export default function AdminPagePeserta({ auth, user, flash, title }) {

    const { data, setData, post, patch, processing, errors } = useForm({
        name: '',
        nim: '',
        email: '',
        password: '12345678',
        password_confirmation: '',
        can_access_tryout_until: null
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
        can_access_tryout_until: null
    })

    function openEditDialog(id, _name, nim, email, can_access_tryout_until) {
        setDataEdit({
            id: id,
            name: _name,
            nim: nim,
            email: email,
            // Dk bisa nampilin password lol
            can_access_tryout_until: can_access_tryout_until
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
                            <h1 className='font-bold py-3'>Data Peserta</h1>

                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <PrimaryButton className='scale-75' onClick={() => document.getElementById('create_data').showModal()}>Tambah Peserta</PrimaryButton>

                            <dialog id="create_data" className="modal mx-auto">
                                <div className="modal-box bg-base-100/90">
                                    <form onSubmit={submit} >
                                        <div>
                                            <h2 className="text-3xl font-bold text-primary">Tambah Peserta</h2>
                                            <p className="my-2 text-base">Masukkan data peserta</p>
                                            <InputLabel htmlFor="name" value="Nama" />

                                            {/* Nama */}
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />

                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        {/* NIM */}

                                        <div className="mt-4">
                                            <InputLabel htmlFor="nim" value="Kode pengenal peserta (NIK/dll) (opsional)" />
                                            <TextInput
                                                id="nim"
                                                type="text"
                                                name="nim"
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('nim', e.target.value)}
                                            />

                                            <InputError message={errors.nim} className="mt-2" />
                                        </div>

                                        {/* Email(Opsional) */}

                                        <div className="mt-4">
                                            <InputLabel htmlFor="email" value="Email Peserta (Opsional)" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('email', e.target.value)}
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        {/* Password(Default 12345678) */}

                                        <div className="mt-4">
                                            <InputLabel htmlFor="password" value="Password Peserta (Secara Default '12345678')" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                className="mt-1 block w-full"
                                                defaultValue={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        {/* Password Confirmation */}

                                        <div className="mt-4">
                                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                            />

                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>

                                        {/* Can access tryout until */}

                                        <div className="mt-4">
                                            <InputLabel htmlFor="can_access_tryout_until" value="Bisa mengakses tryout sampai dengan" />
                                            <TextInput
                                                id="can_access_tryout_until"
                                                type="date"
                                                name="can_access_tryout_until"
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('can_access_tryout_until', e.target.value)}
                                            />

                                            <InputError message={errors.can_access_tryout_until} className="mt-2" />
                                        </div>

                                        {flash.message &&
                                            <div className="alert bg-primary/40 mx-auto mt-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{flash.message}</span>
                                            </div>
                                        }
                                        <div className='flex justify-evenly'>
                                            <PrimaryButton type="submit" className="scale-[1] mt-6" disabled={processing}>Submit</PrimaryButton>
                                            <div className="modal-action">
                                                <form method="dialog ">
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
                                                <th>NIM/Email</th>
                                                <th>Tanggal Didaftarkan</th>
                                                <th>Terakhir diubah</th>
                                                <th className='text-center'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {user.map((data, i) => {
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
                                                            {moment(data.created_at).format('L')}
                                                        </td>
                                                        <td>
                                                            {moment(data.created_at).fromNow()}
                                                        </td>
                                                        <td className="flex justify-center">
                                                            {/* Button View */}
                                                            {/* <button onClick={() => { openEditDialog(data.id, data.name, data.nim, data.email) }} className='bg-slate-500/80 px-8 scale-75 btn glass'>
                                                                <FiEye className='scale-[2.4] stroke-yellow-500'
                                                                >
                                                                </FiEye>
                                                            </button> */}

                                                            {/* Button Edit */}
                                                            <button onClick={() => { openEditDialog(data.id, data.name, data.nim, data.email, data.can_access_tryout_until.split(' ')[0]) }} className='bg-slate-500/80  scale-75 btn glass'>
                                                                <IconContext.Provider
                                                                    value={{ color: '#16a34a', size: '50px' }}
                                                                >
                                                                    <FaUserEdit className='max-h-7' />
                                                                </IconContext.Provider>
                                                            </button>

                                                            {/* Dialog Edit Start */}
                                                            <dialog id={"edit_data :" + data.id} className="modal mx-auto">
                                                                <div className="modal-box bg-base-100/90">
                                                                    <form onSubmit={submitEdit} method='patch'>
                                                                        <div>
                                                                            <h2 className="text-3xl font-bold text-primary">Edit Peserta</h2>
                                                                            <p className="my-2 text-base">Masukkan data peserta</p>
                                                                            <InputLabel htmlFor="name" value="Nama" />

                                                                            {/* Nama */}
                                                                            <TextInput
                                                                                id="name"
                                                                                type="text"
                                                                                name="name"
                                                                                className="mt-1 block w-full"
                                                                                defaultValue={dataEdit.name}
                                                                                isFocused={true}
                                                                                onChange={e => setDataEdit({ ...dataEdit, name: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.name} className="mt-2" />
                                                                        </div>

                                                                        {/* NIM */}

                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="nim" value="NIM Peserta" />
                                                                            <TextInput
                                                                                id="nim"
                                                                                type="text"
                                                                                defaultValue={dataEdit.nim}
                                                                                name="nim"
                                                                                className="mt-1 block w-full "
                                                                                onChange={e => setDataEdit({ ...dataEdit, nim: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.nim} className="mt-2" />
                                                                        </div>

                                                                        {/* Email(Opsional) */}

                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="email" value="Email Peserta (Opsional)" />
                                                                            <TextInput
                                                                                id="email"
                                                                                type="email"
                                                                                name="email"
                                                                                defaultValue={dataEdit.email}
                                                                                className="mt-1 block w-full "
                                                                                onChange={e => setDataEdit({ ...dataEdit, email: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.email} className="mt-2" />
                                                                        </div>

                                                                        {/* Password(Default 12345678) */}

                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="password" value="Masukkan Password Baru" />
                                                                            <TextInput
                                                                                id="password"
                                                                                type="password"
                                                                                name="password"
                                                                                // defaultValue={dataEdit.password}
                                                                                className="mt-1 block w-full"
                                                                                onChange={e => setDataEdit({ ...dataEdit, password: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.password} className="mt-2" />
                                                                        </div>

                                                                        {/* Password Confirmation */}

                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                                                            <TextInput
                                                                                id="password_confirmation"
                                                                                type="password"
                                                                                name="password_confirmation"
                                                                                // defaultValue={dataEdit.password_confirmation}
                                                                                className="mt-1 block w-full "
                                                                                onChange={e => setDataEdit({ ...dataEdit, password_confirmation: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                                                        </div>

                                                                        {/* Can access tryout until */}

                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="can_access_tryout_until" value="Bisa mengakses tryout sampai dengan" />
                                                                            <TextInput
                                                                                id="can_access_tryout_until"
                                                                                type="date"
                                                                                name="can_access_tryout_until"
                                                                                defaultValue={dataEdit.can_access_tryout_until}
                                                                                className="mt-1 block w-full "
                                                                                onChange={e => setDataEdit({ ...dataEdit, can_access_tryout_until: e.target.value })}
                                                                            />

                                                                            <InputError message={errors.can_access_tryout_until} className="mt-2" />
                                                                        </div>

                                                                        {flash.message &&
                                                                            <div className="alert bg-primary/40 mx-auto mt-5">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                                <span>{flash.message}</span>
                                                                            </div>
                                                                        }
                                                                        <div className='flex justify-evenly'>
                                                                            <PrimaryButton type="submit" className="scale-[1] mt-6" disabled={processing}>Submit</PrimaryButton>
                                                                            <div className="modal-action">
                                                                                <form method="dialog">
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

                                                            <button onClick={() => confirmDelete(data.id)} className='transition-all bg-slate-500/80 text- scale-75 btn glass '>
                                                                <IconContext.Provider className=""
                                                                    value={{ color: '#ef4444', size: '50px' }}
                                                                >
                                                                    <IoTrashSharp className='max-h-7' />
                                                                </IconContext.Provider>
                                                            </button>

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
                                                <th>Selesai Dikerjakan</th>
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
