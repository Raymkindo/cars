import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CarListingProps {
    cars: {
        data: Array<{
            id: number;
            ref_number: string;
            make: string;
            model: string;
            year: number;
            price: number;
            mileage: number;
            status: string;
            body_type: string;
            primary_image?: {
                image_path: string;
            };
            created_at: string;
            user?: {
                name: string;
            };
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        last_page: number;
        meta?: any; // strict type fix
    };
    filters: {
        search?: string;
        status?: string;
    };
}

export default function CarsIndex({ cars, filters }: CarListingProps) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    // Handle both 'admin' and 'super_admin' roles for the prefix
    const routePrefix = (auth.user.role === 'admin' || auth.user.role === 'super_admin') ? 'admin' : 'moderator';

    const handleSearch = () => {
        router.get(route(`${routePrefix}.cars.index`), {
            search: search || undefined,
            status: status !== 'all' ? status : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (carId: number) => {
        if (confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
            router.delete(route('cars.destroy', carId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Cars" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Manage Cars</h1>
                    <Button asChild>
                        <Link href={route(`${routePrefix}.cars.create`)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Car
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by make, model, or ref number..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSearch}>
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </div>
                </Card>

                {/* Cars List */}
                {cars.data.length === 0 ? (
                    <Card className="p-12">
                        <div className="text-center">
                            <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No cars found</h3>
                            <p className="text-muted-foreground mb-4">
                                {filters.search || filters.status
                                    ? 'Try adjusting your filters'
                                    : 'Get started by adding your first car'}
                            </p>
                            <Button asChild>
                                <Link href={route(`${routePrefix}.cars.create`)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Car
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <>
                        <div className="rounded-md border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Ref No.</TableHead>
                                        <TableHead>Car Details</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Date Added</TableHead>
                                        <TableHead>Seller</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cars.data.map((car) => (
                                        <TableRow key={car.id}>
                                            <TableCell>
                                                <div className="h-12 w-16 bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden">
                                                    {car.primary_image ? (
                                                        <img
                                                            src={`/storage/${car.primary_image.image_path}`}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <Car className="h-6 w-6 text-neutral-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{car.ref_number}</TableCell>
                                            <TableCell>
                                                <div className="font-semibold">{car.make} {car.model}</div>
                                                <div className="text-xs text-muted-foreground">{car.year} • {car.body_type} • {car.mileage.toLocaleString()} km</div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${car.status === 'available' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    car.status === 'sold' ? 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400' :
                                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {car.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>${car.price.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(car.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{car.user?.name || 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={route(`${routePrefix}.cars.edit`, car.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                        onClick={() => handleDelete(car.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {cars.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {cars.links.map((link: any, index: number) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
