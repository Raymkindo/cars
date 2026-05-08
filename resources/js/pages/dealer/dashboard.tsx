import DealerLayout from '@/layouts/dealer-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, DollarSign, Package, TrendingUp, Plus } from 'lucide-react';

interface Stats {
    total_cars: number;
    available_cars: number;
    sold_cars: number;
    total_value: number;
}

interface RecentCar {
    id: number;
    ref_number: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
    primary_image?: { image_path: string };
}

interface DealerDashboardProps {
    stats: Stats;
    recentCars: RecentCar[];
}

function StatCard({ title, value, sub, icon, color }: {
    title: string; value: string | number; sub?: string;
    icon: React.ReactNode; color: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-md ${color}`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
            </CardContent>
        </Card>
    );
}

export default function DealerDashboard({ stats, recentCars }: DealerDashboardProps) {
    return (
        <DealerLayout>
            <Head title="Dealer Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Showroom</h1>
                        <p className="text-muted-foreground text-sm">Manage your car listings and track performance.</p>
                    </div>
                    <Button asChild>
                        <Link href={route('dealer.cars.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Car
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Listings"
                        value={stats.total_cars}
                        sub="All your cars"
                        icon={<Package className="h-4 w-4 text-white" />}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Available"
                        value={stats.available_cars}
                        sub="Ready for sale"
                        icon={<Car className="h-4 w-4 text-white" />}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Sold"
                        value={stats.sold_cars}
                        sub="Completed deals"
                        icon={<TrendingUp className="h-4 w-4 text-white" />}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Inventory Value"
                        value={`$${Number(stats.total_value).toLocaleString()}`}
                        sub="Available listings"
                        icon={<DollarSign className="h-4 w-4 text-white" />}
                        color="bg-orange-500"
                    />
                </div>

                {/* Recent Cars */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Listings</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('dealer.cars.index')}>View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentCars.length === 0 ? (
                            <div className="text-center py-12">
                                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-4">No listings yet. Add your first car!</p>
                                <Button asChild>
                                    <Link href={route('dealer.cars.create')}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Car
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentCars.map((car) => (
                                    <div key={car.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                        <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            {car.primary_image
                                                ? <img src={`/storage/${car.primary_image.image_path}`} className="w-full h-full object-cover" alt="" />
                                                : <Car className="h-7 w-7 text-neutral-400" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">{car.make} {car.model} {car.year}</h3>
                                            <p className="text-sm text-muted-foreground">Ref: {car.ref_number}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-bold">${car.price.toLocaleString()}</p>
                                            <Badge variant={car.status === 'available' ? 'default' : 'secondary'} className="text-xs">
                                                {car.status}
                                            </Badge>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('dealer.cars.edit', car.id)}>Edit</Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DealerLayout>
    );
}
