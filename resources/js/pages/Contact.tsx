import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Send, HelpCircle, Ship, Clock, Globe } from 'lucide-react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        inquiry_type: 'Sales & Inventory',
        car_of_interest: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setFormSubmitted(true);
                reset();
                setTimeout(() => {
                    setFormSubmitted(false);
                }, 5000);
            }
        });
    };

    return (
        <PublicLayout title="Contact Us">
            {/* Top Impact Hero Section */}
            <div className="relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-950 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(27,52,98,0.18),transparent_50%)] pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-[#1B3462]/20 border border-[#1B3462]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-350 uppercase tracking-widest mb-6">
                            <Clock className="h-3.5 w-3.5 text-slate-300" />
                            24/7 Global Customer Care
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                            GET IN <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-[#ED1C24] bg-clip-text text-transparent">TOUCH WITH US</span>
                        </h1>
                        <p className="text-base md:text-lg text-neutral-300 max-w-xl leading-relaxed">
                            Have questions about importing, shipping times, or a specific car listing? Our dedicated export coordinators are here to assist you.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Interactive Contact Container */}
            <div className="py-16 bg-neutral-50 dark:bg-neutral-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Column (lg:col-span-5): Direct Contact Channels */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* Contact Details Card */}
                            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
                                <h3 className="font-extrabold text-lg text-[#1B3462] dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800 uppercase tracking-wider flex items-center gap-2">
                                    <Phone className="h-4.5 w-4.5" />
                                    Support Channels
                                </h3>

                                <div className="space-y-4">
                                    {/* Channel 1 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="h-10 w-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-neutral-400">Direct Hotline</h4>
                                            <p className="text-sm font-extrabold mt-0.5 text-neutral-900 dark:text-white">+255 22 211 00</p>
                                            <p className="text-[10px] text-neutral-500">Toll-free inside Tanzania (Mon - Sat, 8 AM - 6 PM)</p>
                                        </div>
                                    </div>

                                    {/* Channel 2 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-neutral-400">WhatsApp Sales Support</h4>
                                            <p className="text-sm font-extrabold mt-0.5 text-emerald-600 dark:text-emerald-400">+255 754 000 000</p>
                                            <p className="text-[10px] text-neutral-500">Instant chat responses and custom video walkarounds</p>
                                        </div>
                                    </div>

                                    {/* Channel 3 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="h-10 w-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-neutral-400">Sales & Inquiries Email</h4>
                                            <p className="text-sm font-extrabold mt-0.5 text-neutral-900 dark:text-white">sales@kenasejapan.co.jp</p>
                                            <p className="text-[10px] text-neutral-500">Send purchase terms, bank receipt slips, or custom orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Office & Yards Card */}
                            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
                                <h3 className="font-extrabold text-lg text-[#ED1C24] dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800 uppercase tracking-wider flex items-center gap-2">
                                    <MapPin className="h-4.5 w-4.5" />
                                    Yards & Offices
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <MapPin className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-xs uppercase text-neutral-850 dark:text-white block">Tanzania Yard & Port Hub</strong>
                                            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                                                Kenase Plaza, Plot 42, Gerezani Street, Dar es Salaam Port Area, Tanzania.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <MapPin className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-xs uppercase text-neutral-850 dark:text-white block">Japanese HQ Office</strong>
                                            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                                                3-12-5 Shinjuku, Tokyo, 160-0022, Japan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (lg:col-span-7): Interactive Inquiry Form */}
                        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h3 className="font-extrabold text-xl text-neutral-900 dark:text-white mb-2 uppercase tracking-wide">
                                Send a Custom Inquiry
                            </h3>
                            <p className="text-xs text-neutral-500 mb-6">Fill in details below and an agent will reach back to you in under 2 hours.</p>

                            {formSubmitted ? (
                                <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in duration-300">
                                    <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow-md">
                                        <Send className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-extrabold text-lg text-green-700 dark:text-green-400">Inquiry Sent Successfully!</h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-350 max-w-sm mx-auto leading-relaxed">
                                        Thank you for contacting Kenase Japan. We have assigned a sales manager to compile your vehicle specs. We will reach you shortly on WhatsApp or Email.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold uppercase text-neutral-400">Full Name</label>
                                            <Input 
                                                type="text" 
                                                required
                                                placeholder="e.g. John Mtema"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold uppercase text-neutral-400">Email Address</label>
                                            <Input 
                                                type="email" 
                                                required
                                                placeholder="e.g. john@domain.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold uppercase text-neutral-400">Phone Number (with Country Code)</label>
                                            <Input 
                                                type="tel" 
                                                placeholder="e.g. +255 754 000 000"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold uppercase text-neutral-400">Inquiry Topic</label>
                                            <select 
                                                value={data.inquiry_type}
                                                onChange={(e) => setData('inquiry_type', e.target.value)}
                                                className="flex h-10 w-full rounded border border-neutral-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-neutral-800"
                                            >
                                                <option value="Sales & Inventory">Sales & Stock List Details</option>
                                                <option value="Shipping schedule">Dar es Salaam Shipping Schedule</option>
                                                <option value="Custom clearance">Port Customs & Taxes Help</option>
                                                <option value="Corporate yards">Corporate Partnerships</option>
                                            </select>
                                            <InputError message={errors.inquiry_type} />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-extrabold uppercase text-neutral-400">Vehicle of Interest (Make/Model or Ref Number)</label>
                                        <Input 
                                            type="text" 
                                            placeholder="e.g. Toyota Harrier 2018 or Ref: CAR-00042"
                                            value={data.car_of_interest}
                                            onChange={(e) => setData('car_of_interest', e.target.value)}
                                        />
                                        <InputError message={errors.car_of_interest} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-extrabold uppercase text-neutral-400">Detailed Message</label>
                                        <textarea 
                                            required
                                            rows={4}
                                            placeholder="Write your specific requirements (transmission preference, budget limit, target port)..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="flex w-full rounded border border-neutral-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-neutral-800"
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full text-white font-bold text-xs h-10 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                                        style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}
                                        disabled={processing}
                                    >
                                        <Send className="h-4 w-4" />
                                        {processing ? 'Submitting...' : 'Submit Inquiry'}
                                    </Button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Dar es Salaam Shipping Port Info Section */}
            <div className="py-16 bg-white dark:bg-neutral-900 border-t border-neutral-150 dark:border-neutral-800">
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
                    <Ship className="h-12 w-12 text-[#ED1C24] mx-auto mb-2" />
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">DAR ES SALAAM PORT TRANSIT MATRIX</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl mx-auto">
                        We arrange quick shipping coordinates with the best lines (Höegh, MOL, NYK) for Dar es Salaam.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border dark:border-neutral-800 space-y-2">
                            <strong className="text-sm text-neutral-800 dark:text-white block uppercase">Frequency</strong>
                            <p className="text-xs text-neutral-500">2-3 RoRo and container departures from Nagoya & Yokohama ports every week.</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border dark:border-neutral-800 space-y-2">
                            <strong className="text-sm text-neutral-800 dark:text-white block uppercase">Average Transit Time</strong>
                            <p className="text-xs text-neutral-500">Normally 15 - 25 days depending on direct routing or Singapore transshipment.</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border dark:border-neutral-800 space-y-2">
                            <strong className="text-sm text-neutral-800 dark:text-white block uppercase">Pre-Shipment Inspection</strong>
                            <p className="text-xs text-neutral-500">We fully process TBS (Tanzania Bureau of Standards) inspection slips before departure.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
