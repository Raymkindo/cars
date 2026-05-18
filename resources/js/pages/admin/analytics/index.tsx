import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Package, DollarSign, Store, Users, Activity, CheckCircle, XCircle } from 'lucide-react';

interface AnalyticsProps {
    summary: {
        total_cars: number;
        available_cars: number;
        sold_cars: number;
        total_value: number;
        total_users: number;
        total_dealers: number;
    };
    carsByMake: { make: string; count: number }[];
    carsByBodyType: { body_type: string; count: number }[];
    carsByFuelType: { fuel_type: string; count: number }[];
    carsByStatus: { status: string; count: number }[];
    monthlyListings: { month: string; count: number }[];
    topDealers: { name: string; cars_count: number; total_value: number }[];
}

export default function AdminAnalytics({
    summary,
    carsByMake,
    carsByBodyType,
    carsByFuelType,
    carsByStatus,
    monthlyListings,
    topDealers,
}: AnalyticsProps) {
    return (
        <AdminLayout>
            <Head title="Analytics — Admin" />

            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                </div>

                {/* Summary Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                            <Package className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.total_cars}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {summary.available_cars} available, {summary.sold_cars} sold
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Available Value</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${summary.total_value.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total active listing value</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.total_users}</div>
                            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Dealers</CardTitle>
                            <Store className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.total_dealers}</div>
                            <p className="text-xs text-muted-foreground mt-1">Sellers on platform</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Top Makes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">Top Makes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {carsByMake.map((make, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{make.make}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-24 bg-neutral-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary rounded-full" 
                                                    style={{ width: `${(make.count / Math.max(...carsByMake.map(m => m.count))) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground w-8 text-right">{make.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Breakdown by Type */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">Body Types</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {carsByBodyType.map((type, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0 last:pb-0">
                                        <span className="text-sm">{type.body_type}</span>
                                        <Badge variant="secondary">{type.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Dealers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">Top Performing Dealers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topDealers.map((dealer, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                                        <div>
                                            <div className="text-sm font-semibold">{dealer.name}</div>
                                            <div className="text-xs text-muted-foreground">{dealer.cars_count} cars listed</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-green-600 dark:text-green-500">
                                                ${Number(dealer.total_value).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {topDealers.length === 0 && (
                                    <div className="text-center text-muted-foreground py-4 text-sm">No dealers found.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Trend */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle className="text-md flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Listings Over Last 6 Months
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2 h-40 pt-4">
                                {monthlyListings.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Not enough data to display trend.</div>
                                ) : (
                                    monthlyListings.map((month, idx) => {
                                        const max = Math.max(...monthlyListings.map(m => m.count), 1);
                                        const height = (month.count / max) * 100;
                                        return (
                                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                                                {/* Tooltip */}
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-neutral-800 text-white text-xs py-1 px-2 rounded transition-opacity">
                                                    {month.count} cars
                                                </div>
                                                {/* Bar */}
                                                <div className="w-full bg-primary/20 rounded-t-sm hover:bg-primary transition-colors flex items-end relative" style={{ height: '100%' }}>
                                                    <div className="w-full bg-primary rounded-t-sm" style={{ height: `${height}%` }} />
                                                </div>
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {new Date(month.month + '-01').toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
