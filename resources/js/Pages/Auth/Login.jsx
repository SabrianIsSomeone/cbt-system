import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, login }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        login: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <section className="w-full bg-gambar1 bg-cover">

            <GuestLayout>
                <Head title="Log in" />

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}


                <form onSubmit={submit}>
                    <div>
                        <h2 className="text-3xl font-bold text-primary"> Login</h2>
                        <p className="my-2 text-base">Login menggunakan akun peserta anda</p>
                        <InputLabel htmlFor="login" value="Email" />

                        {/* Email Or NIM */}
                        <TextInput
                            id="login"
                            type="text"
                            name="login"
                            value={data.login}
                            className="mt-1 block w-full border-t-primary border-l-primary border-r-secondary border-b-secondary
                        focus:border-none focus:border-primary"
                            autoComplete="login"
                            isFocused={true}
                            onChange={(e) => setData('login', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                        <InputError message={errors.nim} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-t-primary border-l-primary border-r-secondary border-b-secondary
                        focus:border-none focus:border-primary"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex justify-between mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                className='border-t-primary border-l-primary border-r-secondary border-b-secondary outline-none stroke-none shadow-xl shadow-slate-700'
                                name="remember"
                                value={true}
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>

                    </div>

                    <div className="flex items-center justify-end mt-4">

                        <PrimaryButton className="" disabled={processing}>
                            Log in
                        </PrimaryButton>

                    </div>
                </form>

            </GuestLayout>
        </section>
    );
}
