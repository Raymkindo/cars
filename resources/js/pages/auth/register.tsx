import { useState } from 'react';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            {/* Name */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Name
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        className="pl-10 h-10 rounded-lg border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 focus-visible:ring-[#ED1C24] transition-all font-medium text-sm"
                                    />
                                </div>
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email Address */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Email address
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        className="pl-10 h-10 rounded-lg border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 focus-visible:ring-[#ED1C24] transition-all font-medium text-sm"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-10 rounded-lg border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 focus-visible:ring-[#ED1C24] transition-all font-medium text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4.5 w-4.5" />
                                        ) : (
                                            <Eye className="h-4.5 w-4.5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Confirm password
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                                    </div>
                                    <Input
                                        id="password_confirmation"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-10 rounded-lg border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 focus-visible:ring-[#ED1C24] transition-all font-medium text-sm"
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-2 w-full h-10 rounded-lg text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:opacity-95 active:scale-[0.98]"
                                style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}
                                tabIndex={5}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing && <Spinner className="text-white" />}
                                Create Account
                            </Button>
                        </div>

                        {/* Social Login Divider */}
                        <div className="relative flex items-center justify-center my-1.5">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-neutral-150 dark:border-neutral-800" />
                            </div>
                            <span className="relative bg-background px-3 text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                Or register with
                            </span>
                        </div>

                        {/* Social Sign-In Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                                onClick={() => {}}
                            >
                                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        style={{ fill: '#4285F4' }}
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        style={{ fill: '#34A853' }}
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                        style={{ fill: '#FBBC05' }}
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        style={{ fill: '#EA4335' }}
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                                onClick={() => {}}
                            >
                                <svg className="h-4.5 w-4.5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 3 .95.07 2.1-.55 2.76-1.44z" />
                                </svg>
                                Apple
                            </Button>
                        </div>

                        <div className="text-center text-xs font-bold text-muted-foreground mt-2">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6} className="text-[#ED1C24] hover:underline font-extrabold transition-all">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
