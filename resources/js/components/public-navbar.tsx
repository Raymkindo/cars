import { dashboard, login, register } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Heart, LogIn, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';
import AppearanceToggleDropdown from './appearance-dropdown';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function PublicNavbar() {
    const { auth } = usePage<SharedData>().props;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="w-full border-b bg-white dark:bg-neutral-900 dark:border-neutral-800">
            {/* Top Bar - Utility Links */}
            <div className="bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="container mx-auto px-4 h-9 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-neutral-600 dark:text-neutral-400">
                        <span>Currency: <span className="font-semibold text-black dark:text-white">USD</span></span>
                        <span>Language: <span className="font-semibold text-black dark:text-white">English</span></span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link href={dashboard()} className="hover:text-primary flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="hover:text-primary flex items-center gap-1">
                                    <LogIn className="h-3 w-3" />
                                    <span>Log In</span>
                                </Link>
                                <Link href={register()} className="hover:text-primary font-semibold">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header - Logo, Search, Actions */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <AppLogo className="h-8 w-auto" />
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search by Make, Model, or Keyword..."
                                className="w-full pl-4 pr-10 h-11 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:border-primary"
                            />
                        </div>
                        <Button className="h-11 rounded-l-none px-6">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search className="h-5 w-5" />
                        </Button>

                        <AppearanceToggleDropdown />

                        <Link href="#" className="relative group p-2">
                            <div className="flex flex-col items-center text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                                <Heart className="h-6 w-6" />
                                <span className="text-[10px] uppercase font-medium mt-1">Favorites</span>
                            </div>
                        </Link>

                        <Link href="#" className="relative group p-2">
                            <div className="flex flex-col items-center text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="text-[10px] uppercase font-medium mt-1">Cart</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="mt-4 md:hidden animate-in slide-in-from-top-2">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search cars..."
                                className="flex-1"
                                autoFocus
                            />
                            <Button size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <div className="bg-primary text-primary-foreground md:bg-neutral-800 md:text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-12">
                        {/* Mobile Menu Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white -ml-2">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link href="/" className="text-lg font-medium">Home</Link>
                                    <Link href="#" className="text-lg font-medium">Stock List</Link>
                                    <Link href="#" className="text-lg font-medium">New Arrivals</Link>
                                    <Link href="/about" className="text-lg font-medium">About Us</Link>
                                    <Link href="#" className="text-lg font-medium">Contact</Link>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                            <Link href="/" className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white">
                                HOME
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white flex items-center gap-1 outline-none">
                                    STOCK LIST
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>All Stock</DropdownMenuItem>
                                    <DropdownMenuItem>By Make</DropdownMenuItem>
                                    <DropdownMenuItem>By Type</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="#" className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white">
                                NEW ARRIVALS
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white">
                                REVIEWS
                            </Link>
                            <Link href="/about" className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white">
                                ABOUT US
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground/80 transition-colors py-3 border-b-2 border-transparent hover:border-white">
                                CONTACT
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
