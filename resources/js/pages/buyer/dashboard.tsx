import BuyerLayout from '@/layouts/buyer-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Search, Tag, TrendingDown, TrendingUp } from 'lucide-react';

interface Stats {
    available_cars: number;
    total_makes: number;
    lowest_price: number;
    highest_price: number;
}

interface FeaturedCar {
    id: number;
    ref_number: string;
    make: string;
    model: string;
    year: number;
    price: number;
    body_type: string;
    fuel_type: string;
    mileage: number;
    primary_image?: { image_path: string };
}

interface BuyerDashboardProps {
    stats: Stats;
    featuredCars: FeaturedCar[];
    user: { name: string };
}

export default function BuyerDashboard({ stats, featuredCars, user }: BuyerDashboardProps) {
    return (
        <BuyerLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <h1 className="text-2xl font-bold mb-1">Welcome back, {user.name}! 👋</h1>
                    <p className="opacity-90 text-sm">
                        There are <strong>{stats.available_cars}</strong> cars available right now.
                        Find your perfect match.
                    </p>
                    <Button className="mt-4 bg-white text-primary hover:bg-white/90" asChild>
                        <Link href="/cars">
                            <Search className="h-4 w-4 mr-2" />
                            Browse All Cars
                        </Link>
                    </Button>
                </div>

                {/* Market Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cars Available</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.available_cars}</div>
                            <p className="text-xs text-muted-foreground mt-1">Live listings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Brands</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_makes}</div>
                            <p className="text-xs text-muted-foreground mt-1">Makes available</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Starting From</CardTitle>
                            <TrendingDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Number(stats.lowest_price).toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Lowest price</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Up To</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Number(stats.highest_price).toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Highest price</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Newest Listings */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Newest Arrivals</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/cars">See All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredCars.map((car) => (
                                <Link
                                    key={car.id}
                                    href={`/cars/${car.id}`}
                                    className="group block rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="w-full h-36 bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
                                        {car.primary_image
                                            ? <img src={`/storage/${car.primary_image.image_path}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                                            : <Car className="h-10 w-10 text-neutral-400" />
                                        }
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm truncate">{car.make} {car.model} {car.year}</h3>
                                        <div className="flex gap-1 mt-1">
                                            <Badge variant="outline" className="text-xs">{car.body_type}</Badge>
                                            <Badge variant="outline" className="text-xs">{car.fuel_type}</Badge>
                                        </div>
                                        <p className="font-bold text-primary mt-2">${car.price.toLocaleString()}</p>
                                        <p className="text-xs text-muted-foreground">{car.mileage.toLocaleString()} km</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </BuyerLayout>
    );
}
