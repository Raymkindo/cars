import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, DollarSign, Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardProps {
    stats: {
        total: number;
        available: number;
        sold: number;
    };
    recentCars: Array<{
        id: number;
        ref_number: string;
        make: string;
        model: string;
        year: number;
        price: number;
        status: string;
        primary_image?: {
            image_path: string;
        };
    }>;
}

export default function CarsDashboard({ stats, recentCars }: DashboardProps) {
    return (
        <AdminLayout>
            <Head title="Car Management Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Car Management</h1>
                    <Button asChild>
                        <Link href={route('moderator.cars.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Car
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">All cars in inventory</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Available</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.available}</div>
                            <p className="text-xs text-muted-foreground">Ready for sale</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sold</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.sold}</div>
                            <p className="text-xs text-muted-foreground">Completed sales</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Cars */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Cars</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('moderator.cars.index')}>View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentCars.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No cars yet. Add your first car!</p>
                            ) : (
                                recentCars.map((car) => (
                                    <div key={car.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                        <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-md overflow-hidden flex-shrink-0">
                                            {car.primary_image ? (
                                                <img
                                                    src={`/storage/${car.primary_image.image_path}`}
                                                    alt={`${car.make} ${car.model}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Car className="h-8 w-8 text-neutral-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">{car.make} {car.model} {car.year}</h3>
                                            <p className="text-sm text-muted-foreground">Ref: {car.ref_number}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${car.price.toLocaleString()}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${car.status === 'available'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                                                }`}>
                                                {car.status}
                                            </span>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('moderator.cars.edit', car.id)}>Edit</Link>
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
