import { Link, usePage } from '@inertiajs/react';
import {
    Car,
    BarChart3,
    Home,
    LayoutDashboard,
    LogOut,
    Palette,
    Plus,
    Settings,
    Users,
    Shield,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Mail,
} from 'lucide-react';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

// Helper component for styled items in the sidebar
interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    collapsed?: boolean;
    indent?: boolean;
    badge?: number;
}

function NavLink({ href, icon, label, active, collapsed, indent = false, badge }: NavLinkProps) {
    const content = (
        <Link
            href={href}
            className={`flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors relative duration-150 ${
                indent && !collapsed ? 'pl-8' : ''
            } ${
                active
                    ? 'bg-neutral-800 text-white border-l-4 border-wp-accent font-semibold'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border-l-4 border-transparent'
            }`}
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">{icon}</div>
                {!collapsed && <span className="truncate">{label}</span>}
            </div>

            {!collapsed && badge && badge > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ED1C24] text-white leading-none flex items-center justify-center">
                    {badge}
                </span>
            ) : null}

            {collapsed && badge && badge > 0 ? (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#ED1C24] rounded-full border border-neutral-900" />
            ) : null}
        </Link>
    );

    if (collapsed) {
        return (
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        {content}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-wp-dark border border-neutral-700 text-white font-medium">
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return content;
}

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth, unread_inquiries_count } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const currentPath = window.location.pathname;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    const [isCarsOpen, setIsCarsOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('wp-admin-sidebar-cars-open');
            return saved !== 'false';
        }
        return true;
    });

    useEffect(() => {
        const saved = localStorage.getItem('wp-admin-sidebar-collapsed');
        if (saved === 'true') {
            setIsCollapsed(true);
        }
        setMounted(true);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('wp-admin-sidebar-collapsed', String(next));
            return next;
        });
    };

    const toggleCarsMenu = () => {
        setIsCarsOpen(prev => {
            const next = !prev;
            localStorage.setItem('wp-admin-sidebar-cars-open', String(next));
            return next;
        });
    };

    const isCarsActive = currentPath.startsWith('/admin/cars');

    return (
        <div className="min-h-screen bg-wp-canvas dark:bg-neutral-950 flex flex-col font-sans text-neutral-900 dark:text-neutral-100">
            {/* Sticky Top Admin Bar */}
            <div className="h-10 bg-wp-dark text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 select-none shadow-sm border-b border-neutral-800">
                <div className="flex items-center h-full">
                    {/* Brand Logo / Link */}
                    <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 h-full hover:bg-neutral-800 text-white font-bold text-sm transition-colors mr-2">
                        <Shield className="h-4 w-4 text-wp-accent" />
                        <span>Admin Panel</span>
                    </Link>

                    {/* Visit Site shortcut */}
                    <Link href="/" className="flex items-center gap-1.5 px-3 h-full hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors">
                        <Home className="h-3.5 w-3.5" />
                        <span className="hidden md:inline-block">Visit Site</span>
                    </Link>

                    {/* Quick Add Dropdown "+ New" */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 px-3 h-full hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors focus:outline-none cursor-pointer">
                                <Plus className="h-3.5 w-3.5" />
                                <span>New</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="mt-1">
                            <DropdownMenuItem asChild>
                                <Link href={route('admin.cars.create')} className="w-full flex items-center cursor-pointer">
                                    <Car className="mr-2 h-4 w-4" />
                                    Car Listing
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={route('admin.users.index')} className="w-full flex items-center cursor-pointer">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Users
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center h-full gap-2">
                    {unread_inquiries_count && unread_inquiries_count > 0 ? (
                        <Link 
                            href={route('admin.inquiries.index')}
                            className="relative flex items-center justify-center p-1.5 hover:bg-neutral-850 rounded-full text-neutral-300 hover:text-white transition-colors cursor-pointer mr-1"
                            title={`${unread_inquiries_count} unread inquiries`}
                        >
                            <Mail className="h-4.5 w-4.5" />
                            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-[#ED1C24] text-[8px] text-white font-black rounded-full flex items-center justify-center border border-neutral-900 animate-pulse">
                                {unread_inquiries_count}
                            </span>
                        </Link>
                    ) : null}

                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-red-950/80 border border-red-800/40 text-red-400">
                        Super Admin
                    </span>

                    {/* User Profile dropdown - wp-admin style "Howdy, User" */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white h-full px-3 transition-colors text-neutral-300 text-sm font-medium focus:outline-none cursor-pointer">
                                <span className="hidden sm:inline-block">Howdy, <strong>{auth.user.name}</strong></span>
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/" className="w-full flex items-center cursor-pointer">
                                    <Home className="mr-2 h-4 w-4" />
                                    Visit Homepage
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/logout" method="post" as="button" className="w-full flex items-center text-red-600 dark:text-red-400 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-1 pt-10">
                {/* Collapsible Sidebar */}
                <aside className={`${isCollapsed ? 'md:w-16' : 'md:w-64'} w-0 bg-wp-dark border-r border-neutral-800 md:flex hidden flex-col fixed top-10 bottom-0 left-0 z-40 transition-all duration-300 text-neutral-300 select-none justify-between`}>
                    <div className="flex-1 overflow-y-auto py-3">
                        {!isCollapsed && (
                            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                                Administration
                            </p>
                        )}
                        <nav className="px-2 space-y-1">
                            <NavLink
                                href="/admin/dashboard"
                                icon={<LayoutDashboard className="h-5 w-5" />}
                                label="Dashboard"
                                active={currentPath === '/admin/dashboard'}
                                collapsed={isCollapsed}
                            />
                            
                            {/* Cars Section */}
                            {isCollapsed ? (
                                <NavLink
                                    href={route('admin.cars.index')}
                                    icon={<Car className="h-5 w-5" />}
                                    label="Cars"
                                    active={isCarsActive}
                                    collapsed={true}
                                />
                            ) : (
                                <div className="flex flex-col">
                                    <button
                                        onClick={toggleCarsMenu}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors border-l-4 cursor-pointer focus:outline-none ${
                                            isCarsActive
                                                ? 'bg-neutral-800 text-white border-l-wp-accent font-semibold'
                                                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border-l-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Car className="h-5 w-5 flex-shrink-0" />
                                            <span>Cars</span>
                                        </div>
                                        {isCarsOpen ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                                    </button>
                                    
                                    {isCarsOpen && (
                                        <div className="bg-neutral-900/40 py-1 space-y-0.5">
                                            <NavLink
                                                href={route('admin.cars.index')}
                                                icon={<span className="w-1.5 h-1.5 rounded-full bg-neutral-600 block mx-1.5" />}
                                                label="All Cars"
                                                active={currentPath === route('admin.cars.index')}
                                                indent={true}
                                            />
                                            <NavLink
                                                href={route('admin.cars.create')}
                                                icon={<span className="w-1.5 h-1.5 rounded-full bg-neutral-600 block mx-1.5" />}
                                                label="Add New"
                                                active={currentPath === route('admin.cars.create')}
                                                indent={true}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <NavLink
                                href={route('admin.users.index')}
                                icon={<Users className="h-5 w-5" />}
                                label="Users"
                                active={currentPath.startsWith('/admin/users')}
                                collapsed={isCollapsed}
                            />
                            <NavLink
                                href={route('admin.inquiries.index')}
                                icon={<Mail className="h-5 w-5" />}
                                label="Inquiries"
                                active={currentPath.startsWith('/admin/inquiries')}
                                collapsed={isCollapsed}
                                badge={unread_inquiries_count}
                            />
                            <NavLink
                                href={route('admin.analytics.index')}
                                icon={<BarChart3 className="h-5 w-5" />}
                                label="Analytics"
                                active={currentPath.startsWith('/admin/analytics')}
                                collapsed={isCollapsed}
                            />
                            <NavLink
                                href={route('admin.appearance.index')}
                                icon={<Palette className="h-5 w-5" />}
                                label="Appearance"
                                active={currentPath.startsWith('/admin/appearance')}
                                collapsed={isCollapsed}
                            />
                            <NavLink
                                href={route('admin.settings.index')}
                                icon={<Settings className="h-5 w-5" />}
                                label="Settings"
                                active={currentPath.startsWith('/admin/settings')}
                                collapsed={isCollapsed}
                            />
                        </nav>
                    </div>

                    <div className="mt-auto flex flex-col space-y-1">
                        <NavLink 
                            href="/" 
                            icon={<Home className="h-5 w-5" />} 
                            label="View Frontend" 
                            collapsed={isCollapsed} 
                        />
                        
                        {/* Collapse Menu Toggle Button */}
                        <div className="border-t border-neutral-800 p-2">
                            <button
                                onClick={toggleSidebar}
                                className="w-full flex items-center justify-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none"
                                title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
                            >
                                {isCollapsed ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <ChevronLeft className="h-4 w-4" />
                                        <span>Collapse Menu</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'md:pl-16' : 'md:pl-64'} pl-0`}>
                    <main className="flex-1 p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
