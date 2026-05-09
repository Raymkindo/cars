import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, DollarSign, Package, Store, User, Users } from 'lucide-react';

interface Stats {
    total_cars: number;
    available_cars: number;
    sold_cars: number;
    total_value: number;
    total_users: number;
    total_dealers: number;
    total_buyers: number;
}

interface RecentCar {
    id: number;
    ref_number: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
    dealer: string;
    primary_image?: { image_path: string };
}

interface Dealer {
    id: number;
    name: string;
    email: string;
    cars_count: number;
    total_value: number;
}

interface AdminDashboardProps {
    stats: Stats;
    recentCars: RecentCar[];
    dealers: Dealer[];
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

export default function AdminDashboard({ stats, recentCars, dealers }: AdminDashboardProps) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Platform Overview</h1>
                    <p className="text-muted-foreground text-sm">Welcome back, Super Admin.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Cars"
                        value={stats.total_cars}
                        sub={`${stats.available_cars} available · ${stats.sold_cars} sold`}
                        icon={<Package className="h-4 w-4 text-white" />}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Inventory Value"
                        value={`$${stats.total_value.toLocaleString()}`}
                        sub="Available listings"
                        icon={<DollarSign className="h-4 w-4 text-white" />}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Registered Users"
                        value={stats.total_users}
                        sub={`${stats.total_dealers} dealers · ${stats.total_buyers} buyers`}
                        icon={<Users className="h-4 w-4 text-white" />}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Active Dealers"
                        value={stats.total_dealers}
                        sub="Managing listings"
                        icon={<Store className="h-4 w-4 text-white" />}
                        color="bg-orange-500"
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Recent Listings */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Listings</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('admin.cars.index')}>View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentCars.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No cars yet.</p>
                                ) : (
                                    recentCars.map((car) => (
                                        <div key={car.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                            <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                <img 
                                                    src={car.primary_image ? `/storage/${car.primary_image.image_path}` : "/images/default-car.png"} 
                                                    className={`w-full h-full object-cover ${!car.primary_image && 'opacity-50 grayscale'}`} 
                                                    alt={`${car.make} ${car.model}`} 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{car.make} {car.model} {car.year}</p>
                                                <p className="text-xs text-muted-foreground">by {car.dealer} · {car.ref_number}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-bold text-sm">${car.price.toLocaleString()}</p>
                                                <Badge variant={car.status === 'available' ? 'default' : 'secondary'} className="text-xs">
                                                    {car.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dealers Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Dealers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dealers.map((dealer) => (
                                    <div key={dealer.id} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{dealer.name}</p>
                                            <p className="text-xs text-muted-foreground">{dealer.cars_count} cars listed</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs font-semibold">${Number(dealer.total_value).toLocaleString()}</p>
                                            <p className="text-xs text-muted-foreground">value</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
