import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface CarFormProps {
    car?: {
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
    onSubmit: (data: any) => void;
    processing: boolean;
}

export default function CarForm({ car, onSubmit, processing }: CarFormProps) {
    const { errors: pageErrors } = usePage().props;
    const { data, setData, errors: formErrors } = useForm({
        make: car?.make || '',
        model: car?.model || '',
        year: car?.year || new Date().getFullYear(),
        price: car?.price || '',
        mileage: car?.mileage || '',
        vin: car?.vin || '',
        body_type: car?.body_type || '',
        fuel_type: car?.fuel_type || '',
        transmission: car?.transmission || '',
        drive_type: car?.drive_type || '',
        color: car?.color || '',
        condition: car?.condition || '',
        description: car?.description || '',
        status: car?.status || 'available',
        images: [] as File[],
    });

    // Merge form errors with page errors (from parent router.post)
    const errors = { ...formErrors, ...pageErrors };

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData('images', newImages);

        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newPreviews);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="make">Make *</Label>
                            <Input
                                id="make"
                                value={data.make}
                                onChange={(e) => setData('make', e.target.value)}
                                placeholder="Toyota"
                                required
                            />
                            {errors.make && <p className="text-sm text-red-600 mt-1">{errors.make}</p>}
                        </div>

                        <div>
                            <Label htmlFor="model">Model *</Label>
                            <Input
                                id="model"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                                placeholder="Camry"
                                required
                            />
                            {errors.model && <p className="text-sm text-red-600 mt-1">{errors.model}</p>}
                        </div>

                        <div>
                            <Label htmlFor="year">Year *</Label>
                            <Input
                                id="year"
                                type="number"
                                value={data.year}
                                onChange={(e) => setData('year', parseInt(e.target.value))}
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                required
                            />
                            {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year}</p>}
                        </div>

                        <div>
                            <Label htmlFor="price">Price (USD) *</Label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                placeholder="25000"
                                min="0"
                                step="0.01"
                                required
                            />
                            {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <Label htmlFor="mileage">Mileage (km) *</Label>
                            <Input
                                id="mileage"
                                type="number"
                                value={data.mileage}
                                onChange={(e) => setData('mileage', e.target.value)}
                                placeholder="15000"
                                min="0"
                                required
                            />
                            {errors.mileage && <p className="text-sm text-red-600 mt-1">{errors.mileage}</p>}
                        </div>

                        <div>
                            <Label htmlFor="vin">VIN (Optional)</Label>
                            <Input
                                id="vin"
                                value={data.vin}
                                onChange={(e) => setData('vin', e.target.value)}
                                placeholder="1HGBH41JXMN109186"
                            />
                            {errors.vin && <p className="text-sm text-red-600 mt-1">{errors.vin}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="body_type">Body Type *</Label>
                            <Select value={data.body_type} onValueChange={(value) => setData('body_type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select body type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sedan">Sedan</SelectItem>
                                    <SelectItem value="SUV">SUV</SelectItem>
                                    <SelectItem value="Truck">Truck</SelectItem>
                                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                                    <SelectItem value="Coupe">Coupe</SelectItem>
                                    <SelectItem value="Van">Van</SelectItem>
                                    <SelectItem value="Wagon">Wagon</SelectItem>
                                    <SelectItem value="Convertible">Convertible</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.body_type && <p className="text-sm text-red-600 mt-1">{errors.body_type}</p>}
                        </div>

                        <div>
                            <Label htmlFor="fuel_type">Fuel Type *</Label>
                            <Select value={data.fuel_type} onValueChange={(value) => setData('fuel_type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Petrol">Petrol</SelectItem>
                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    <SelectItem value="Electric">Electric</SelectItem>
                                    <SelectItem value="Plug-in Hybrid">Plug-in Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.fuel_type && <p className="text-sm text-red-600 mt-1">{errors.fuel_type}</p>}
                        </div>

                        <div>
                            <Label htmlFor="transmission">Transmission *</Label>
                            <Select value={data.transmission} onValueChange={(value) => setData('transmission', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select transmission" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Automatic">Automatic</SelectItem>
                                    <SelectItem value="Manual">Manual</SelectItem>
                                    <SelectItem value="CVT">CVT</SelectItem>
                                    <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.transmission && <p className="text-sm text-red-600 mt-1">{errors.transmission}</p>}
                        </div>

                        <div>
                            <Label htmlFor="drive_type">Drive Type *</Label>
                            <Select value={data.drive_type} onValueChange={(value) => setData('drive_type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select drive type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FWD">FWD (Front-Wheel Drive)</SelectItem>
                                    <SelectItem value="RWD">RWD (Rear-Wheel Drive)</SelectItem>
                                    <SelectItem value="AWD">AWD (All-Wheel Drive)</SelectItem>
                                    <SelectItem value="4WD">4WD (Four-Wheel Drive)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.drive_type && <p className="text-sm text-red-600 mt-1">{errors.drive_type}</p>}
                        </div>

                        <div>
                            <Label htmlFor="color">Color *</Label>
                            <Input
                                id="color"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                placeholder="White"
                                required
                            />
                            {errors.color && <p className="text-sm text-red-600 mt-1">{errors.color}</p>}
                        </div>

                        <div>
                            <Label htmlFor="condition">Condition *</Label>
                            <Select value={data.condition} onValueChange={(value) => setData('condition', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Used">Used</SelectItem>
                                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.condition && <p className="text-sm text-red-600 mt-1">{errors.condition}</p>}
                        </div>

                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="sold">Sold</SelectItem>
                                    <SelectItem value="reserved">Reserved</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <div>
                        <Label htmlFor="description">Description (Optional)</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter car description, features, condition details, etc."
                        />
                        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Images */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Images</h3>

                    {/* Existing Images */}
                    {car?.images && car.images.length > 0 && (
                        <div className="mb-4">
                            <Label className="mb-2 block">Current Images</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {car.images.map((image) => (
                                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border">
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt="Car"
                                            className="w-full h-full object-cover"
                                        />
                                        {image.is_primary && (
                                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                                Primary
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload New Images */}
                    <div>
                        <Label htmlFor="images">{car ? 'Add More Images' : 'Upload Images'} (Max 10)</Label>
                        <div className="mt-2">
                            <label
                                htmlFor="images"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                        PNG, JPG, WEBP (MAX. 5MB each)
                                    </p>
                                </div>
                                <input
                                    id="images"
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {errors.images && <p className="text-sm text-red-600 mt-1">{errors.images}</p>}
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="mt-4">
                            <Label className="mb-2 block">New Images Preview</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        {index === 0 && !car && (
                                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                                Primary
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : car ? 'Update Car' : 'Add Car'}
                </Button>
            </div>
        </form>
    );
}
