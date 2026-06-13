import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
                <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
                    {status && (
                        <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-3">
                                Username
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="username@gmail.com"
                                value={data.email}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-600" />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-3">
                                Password
                            </label>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••••••••••"
                                value={data.password}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-red-600" />
                        </div>

                        {/* Login Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-700 hover:bg-green-800 disabled:bg-green-600 text-white font-bold py-2 px-8 rounded-lg transition duration-200"
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
