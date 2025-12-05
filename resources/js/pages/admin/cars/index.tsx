import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            user?: {
                name: string;
            };
        }>;
        links: any;
        meta: any;
    };
    filters: {
        search?: string;
        status?: string;
    };
}

export default function CarsIndex({ cars, filters }: CarListingProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleSearch = () => {
        router.get(route('moderator.cars.index'), {
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
                        <Link href={route('moderator.cars.create')}>
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

                {/* Cars Grid */}
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
                                <Link href={route('moderator.cars.create')}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Car
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.data.map((car) => (
                                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 relative">
                                        {car.primary_image ? (
                                            <img
                                                src={`/storage/${car.primary_image.image_path}`}
                                                alt={`${car.make} ${car.model}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Car className="h-16 w-16 text-neutral-400" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                            {car.ref_number}
                                        </div>
                                        <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${car.status === 'available'
                                                ? 'bg-green-500 text-white'
                                                : car.status === 'sold'
                                                    ? 'bg-neutral-500 text-white'
                                                    : 'bg-yellow-500 text-white'
                                            }`}>
                                            {car.status}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-1">
                                            {car.make} {car.model} {car.year}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {car.body_type} • {car.mileage.toLocaleString()} km
                                        </p>
                                        {car.user && (
                                            <p className="text-xs text-muted-foreground mb-3">
                                                Seller: {car.user.name}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xl font-bold text-primary">
                                                ${car.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1" asChild>
                                                <Link href={route('moderator.cars.edit', car.id)}>
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                onClick={() => handleDelete(car.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {cars.meta.last_page > 1 && (
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
