import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import CarForm from '@/components/car-form';
import { useState } from 'react';

interface EditCarProps {
    car: {
        id: number;
        make: string;
        model: string;
        year: number;
        price: number;
        mileage: number;
        vin?: string;
        body_type: string;
        fuel_type: string;
        transmission: string;
        drive_type: string;
        color: string;
        condition: string;
        description?: string;
        status: string;
        images?: Array<{
            id: number;
            image_path: string;
            is_primary: boolean;
        }>;
    };
}

export default function EditCar({ car }: EditCarProps) {
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data: any) => {
        router.post(route('cars.update', car.id), {
            ...data,
            _method: 'PUT',
        }, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${car.make} ${car.model}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Car</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the details for {car.make} {car.model} {car.year}
                    </p>
                </div>

                <CarForm
                    car={car}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            </div>
        </AdminLayout>
    );
}
