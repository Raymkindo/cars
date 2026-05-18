import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserCog, Users, Shield, Car, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    cars_count: number;
    created_at: string;
    email_verified_at: string | null;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    users: PaginatedUsers;
    filters: { search?: string; role?: string };
    roles: string[];
}

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    super_admin: { label: 'Super Admin', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: <Shield className="h-3 w-3" /> },
    moderator:   { label: 'Moderator',   color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: <UserCog className="h-3 w-3" /> },
    dealer:      { label: 'Dealer',      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: <Car className="h-3 w-3" /> },
    buyer:       { label: 'Buyer',       color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: <ShoppingCart className="h-3 w-3" /> },
};

export default function AdminUsersIndex({ users, filters, roles }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');

    const applyFilters = (newSearch: string, newRole: string) => {
        router.get(route('admin.users.index'), {
            search: newSearch || undefined,
            role: newRole || undefined,
        }, { preserveState: true, replace: true });
    };

    const updateRole = (userId: number, newRole: string) => {
        router.post(route('admin.users.role', userId), { role: newRole }, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Users — Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-6 w-6 text-primary" /> User Management
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            {users.total} registered users
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-4 flex flex-wrap gap-3">
                        <div className="relative flex-1 min-w-48">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="pl-9"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters(search, roleFilter)}
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); applyFilters(search, v === 'all' ? '' : v); }}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                {roles.map(r => (
                                    <SelectItem key={r} value={r}>{ROLE_CONFIG[r]?.label ?? r}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={() => applyFilters(search, roleFilter)}>Search</Button>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users ({users.from}–{users.to} of {users.total})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-neutral-50 dark:bg-neutral-900 border-b">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-semibold">User</th>
                                        <th className="text-left px-4 py-3 font-semibold">Role</th>
                                        <th className="text-left px-4 py-3 font-semibold">Cars Listed</th>
                                        <th className="text-left px-4 py-3 font-semibold">Verified</th>
                                        <th className="text-left px-4 py-3 font-semibold">Joined</th>
                                        <th className="text-left px-4 py-3 font-semibold">Change Role</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {users.data.map((user) => {
                                        const cfg = ROLE_CONFIG[user.role] ?? { label: user.role, color: 'bg-neutral-100 text-neutral-700', icon: null };
                                        return (
                                            <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                                                        {cfg.icon}{cfg.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center font-semibold">{user.cars_count}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs font-medium ${user.email_verified_at ? 'text-green-600' : 'text-red-500'}`}>
                                                        {user.email_verified_at ? '✓ Verified' : '✗ Unverified'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-xs text-muted-foreground">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Select defaultValue={user.role} onValueChange={(v) => updateRole(user.id, v)}>
                                                        <SelectTrigger className="h-8 w-36 text-xs">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roles.map(r => (
                                                                <SelectItem key={r} value={r} className="text-xs">
                                                                    {ROLE_CONFIG[r]?.label ?? r}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="flex justify-center gap-1 p-4 border-t">
                                {users.links.map((link, i) => (
                                    link.url ? (
                                        <Link key={i} href={link.url}
                                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span key={i} className="px-3 py-1.5 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
