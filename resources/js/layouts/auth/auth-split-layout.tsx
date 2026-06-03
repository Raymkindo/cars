import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Car, ShieldCheck, Zap, Star } from 'lucide-react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden select-none">
                {/* Visual Background */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out hover:scale-105"
                    style={{ backgroundImage: `url('/images/auth-cover.png')` }}
                />
                {/* Advanced Gradient Overlay */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#1B3462]/95 via-[#0A0F1D]/90 to-[#ED1C24]/20 mix-blend-multiply animate-pulse-subtle" 
                />
                
                {/* Logo & Navigation */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-2.5 text-xl font-black uppercase tracking-wider text-white hover:text-white/90 transition-colors"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                        <AppLogoIcon className="size-6 fill-current text-[#ED1C24] dark:text-[#ff5e62]" />
                    </div>
                    <span className="font-extrabold">{name}</span>
                </Link>

                {/* Center Showcase: Premium Features */}
                <div className="relative z-20 my-auto max-w-md space-y-6">
                    <div className="space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#ED1C24] text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
                            ★ Trust & Quality
                        </span>
                        <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">
                            Drive your story <br />
                            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#ED1C24] bg-clip-text text-transparent">forward today</span>
                        </h2>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex items-start gap-3.5 group">
                            <div className="mt-0.5 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 shadow transition-colors group-hover:bg-[#ED1C24] duration-300">
                                <Car className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">500+ Hand-Picked Vehicles</h4>
                                <p className="text-xs text-neutral-300 mt-0.5">High-quality stock from luxury SUVs to economical city runabouts.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 group">
                            <div className="mt-0.5 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 shadow transition-colors group-hover:bg-[#ED1C24] duration-300">
                                <ShieldCheck className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">Rigorous 100-Point Inspection</h4>
                                <p className="text-xs text-neutral-300 mt-0.5">Every vehicle undergoes absolute mechanical and physical certification.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 group">
                            <div className="mt-0.5 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 shadow transition-colors group-hover:bg-[#ED1C24] duration-300">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">Direct Dar es Salaam Shipping</h4>
                                <p className="text-xs text-neutral-300 mt-0.5">Secure, fast, and certified maritime shipping with customs support.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Testimonial */}
                <div className="relative z-20 mt-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <blockquote className="space-y-1">
                        <p className="text-sm font-medium leading-relaxed italic text-white/95">
                            &ldquo;{quote?.message || "The easiest car purchase I've ever made. The import process was flawless and stress-free."}&rdquo;
                        </p>
                        <footer className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff5e62] mt-1">
                            — {quote?.author || "John M. · Dar es Salaam"}
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right side form */}
            <div className="w-full lg:p-8 flex items-center justify-center bg-background py-12 lg:py-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-6 sm:w-[380px] sm:px-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-850 shadow-md">
                            <AppLogoIcon className="h-7 fill-current text-[#ED1C24] dark:text-[#ff5e62]" />
                        </div>
                    </Link>
                    <div className="flex flex-col items-start gap-1.5 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-none">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
