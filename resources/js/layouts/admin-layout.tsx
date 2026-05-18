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
} from 'lucide-react';
import { PropsWithChildren } from 'react';
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

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

function NavLink({ href, icon, label, active }: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                active
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
        >
            {icon}
            {label}
        </Link>
    );
}

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const currentPath = window.location.pathname;

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex-shrink-0 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl">
                        <Shield className="h-6 w-6 text-primary" />
                        <span>Admin Panel</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <p className="px-4 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                        Platform
                    </p>
                    <nav className="px-4 space-y-1">
                        <NavLink
                            href="/admin/dashboard"
                            icon={<LayoutDashboard className="h-5 w-5" />}
                            label="Dashboard"
                            active={currentPath === '/admin/dashboard'}
                        />
                        <NavLink
                            href={route('admin.cars.index')}
                            icon={<Car className="h-5 w-5" />}
                            label="All Cars"
                            active={currentPath.startsWith('/admin/cars')}
                        />
                        <NavLink
                            href={route('admin.users.index')}
                            icon={<Users className="h-5 w-5" />}
                            label="Users"
                            active={currentPath.startsWith('/admin/users')}
                        />
                        <NavLink
                            href={route('admin.analytics.index')}
                            icon={<BarChart3 className="h-5 w-5" />}
                            label="Analytics"
                            active={currentPath.startsWith('/admin/analytics')}
                        />
                        <NavLink
                            href={route('admin.appearance.index')}
                            icon={<Palette className="h-5 w-5" />}
                            label="Appearance"
                            active={currentPath.startsWith('/admin/appearance')}
                        />
                        <NavLink
                            href={route('admin.settings.index')}
                            icon={<Settings className="h-5 w-5" />}
                            label="Settings"
                            active={currentPath.startsWith('/admin/settings')}
                        />
                    </nav>
                </div>

                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                    <NavLink href="/" icon={<Home className="h-5 w-5" />} label="Back to Site" />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <Shield className="h-3 w-3" />
                            Super Admin
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('admin.cars.create')}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Car
                            </Link>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/logout" method="post" as="button" className="w-full flex items-center">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
