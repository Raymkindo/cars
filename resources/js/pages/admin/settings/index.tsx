import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, Save, Globe, DollarSign, Phone, Mail } from 'lucide-react';

interface SettingsProps {
    settings: Record<string, string>;
}

export default function AdminSettings({ settings }: SettingsProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || 'Cars Marketplace',
        contact_email: settings.contact_email || 'contact@carsmarket.com',
        contact_phone: settings.contact_phone || '+1 234 567 890',
        currency: settings.currency || 'USD',
        items_per_page: settings.items_per_page || '15',
        footer_text: settings.footer_text || '© 2026 Cars Marketplace. All rights reserved.',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Settings — Admin" />

            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">General Settings</h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Identity</CardTitle>
                            <CardDescription>Basic information about your platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="site_name" className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" /> Site Name
                                </Label>
                                <Input
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={e => setData('site_name', e.target.value)}
                                    placeholder="e.g. My Cars Marketplace"
                                />
                                {errors.site_name && <p className="text-sm text-red-500">{errors.site_name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="footer_text">Footer Copyright Text</Label>
                                <Textarea
                                    id="footer_text"
                                    value={data.footer_text}
                                    onChange={e => setData('footer_text', e.target.value)}
                                    placeholder="© 2026 Cars Marketplace. All rights reserved."
                                />
                                {errors.footer_text && <p className="text-sm text-red-500">{errors.footer_text}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Primary contact details displayed to users.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="contact_email" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" /> Public Email
                                    </Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={e => setData('contact_email', e.target.value)}
                                    />
                                    {errors.contact_email && <p className="text-sm text-red-500">{errors.contact_email}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact_phone" className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" /> Public Phone
                                    </Label>
                                    <Input
                                        id="contact_phone"
                                        value={data.contact_phone}
                                        onChange={e => setData('contact_phone', e.target.value)}
                                    />
                                    {errors.contact_phone && <p className="text-sm text-red-500">{errors.contact_phone}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Display Preferences</CardTitle>
                            <CardDescription>Regional and pagination settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="currency" className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" /> Currency Code
                                    </Label>
                                    <Input
                                        id="currency"
                                        value={data.currency}
                                        onChange={e => setData('currency', e.target.value)}
                                        placeholder="USD, EUR, GBP..."
                                    />
                                    {errors.currency && <p className="text-sm text-red-500">{errors.currency}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="items_per_page">Items Per Page</Label>
                                    <Input
                                        id="items_per_page"
                                        type="number"
                                        value={data.items_per_page}
                                        onChange={e => setData('items_per_page', e.target.value)}
                                    />
                                    {errors.items_per_page && <p className="text-sm text-red-500">{errors.items_per_page}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4">
                        {recentlySuccessful && (
                            <span className="text-sm text-green-600 font-medium">Settings saved successfully.</span>
                        )}
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Settings</>}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
