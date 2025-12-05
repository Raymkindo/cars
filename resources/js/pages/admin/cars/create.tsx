import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import CarForm from '@/components/car-form';
import { Card } from '@/components/ui/card';

export default function CreateCar() {
    const handleSubmit = (data: any) => {
        router.post(route('cars.store'), data, {
            forceFormData: true,
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Add New Car" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Add New Car</h1>
                    <p className="text-muted-foreground mt-1">
                        Fill in the details below to add a new car to your inventory
                    </p>
                </div>

                <CarForm
                    onSubmit={handleSubmit}
                    processing={false}
                />
            </div>
        </AdminLayout>
    );
}
