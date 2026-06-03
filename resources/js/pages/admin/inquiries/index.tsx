import AdminLayout from '@/layouts/admin-layout';
import DealerLayout from '@/layouts/dealer-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { 
    Search, Mail, Eye, Trash2, Calendar, Phone, Car, 
    Send, Reply, CheckCircle2, Inbox, MailOpen, CornerDownRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    inquiry_type: string;
    car_of_interest: string | null;
    message: string;
    status: 'unread' | 'read' | 'replied';
    reply_text: string | null;
    replied_at: string | null;
    created_at: string;
}

interface PaginatedInquiries {
    data: Inquiry[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    inquiries: PaginatedInquiries;
    filters: { search?: string; status?: string };
}

const TOPIC_BADGES: Record<string, string> = {
    'Sales & Inventory': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-450 border border-blue-200/30',
    'Shipping schedule': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-450 border border-purple-200/30',
    'Custom clearance': 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-450 border border-amber-200/30',
    'Corporate yards': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-450 border border-emerald-200/30',
};

const QUICK_TEMPLATES = [
    {
        label: 'Wire Transfer Info',
        text: `Dear [Name],\n\nThank you for your interest. To proceed with the purchase, please secure payment via bank wire to our verified account:\n\nBank Name: Tokyo Metropolitan Bank\nBranch: Main Office\nAccount Name: Cars Marketplace Co., Ltd.\nAccount Number: 1234-5678-9012\nSWIFT Code: TMBKJPJT\n\nPlease email a copy of the transfer slip once completed so we can secure the shipment reservation.\n\nBest regards,\n[Dealer]`
    },
    {
        label: 'Transit Times',
        text: `Dear [Name],\n\nRegarding the transit times for this vehicle:\n- RORO Vessel booking takes approximately 7-10 days.\n- Ocean transit duration is estimated at 25-35 days depending on the destination port.\n- Total time from payment clearance to port arrival is approximately 35-45 days.\n\nWe will provide the name of the vessel and the ETA details once booking is confirmed.\n\nBest regards,\n[Dealer]`
    },
    {
        label: 'Verify Specs',
        text: `Dear [Name],\n\nRegarding the specifications of the vehicle:\n- Condition: The vehicle is in excellent condition and has passed our 150-point inspection.\n- Odometer: The mileage is certified and original.\n- Accessories: Includes original key, air conditioning, ABS, and dual airbags.\n\nIf you have any further questions or require specific pictures of any section, please let us know.\n\nBest regards,\n[Dealer]`
    }
];

export default function AdminInquiriesIndex({ inquiries, filters }: Props) {
    const { auth } = usePage<any>().props;
    const isDealer = auth?.user?.role === 'dealer';

    const getRoute = (name: string, params?: any) => {
        const prefix = isDealer ? 'dealer.inquiries' : 'admin.inquiries';
        return route(`${prefix}.${name}`, params);
    };

    const [search, setSearch] = useState(filters.search || '');
    const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(() => {
        // Automatically select the first inquiry if available
        return inquiries.data.length > 0 ? inquiries.data[0].id : null;
    });

    const activeStatus = filters.status || 'all';

    // Find the currently selected inquiry from fresh page props
    const selectedInquiry = inquiries.data.find(i => i.id === selectedInquiryId) || null;

    // Inertia form hook for replying
    const { data, setData, post, processing, errors, reset } = useForm({
        reply_message: ''
    });

    // Auto mark as read when selecting an unread inquiry
    useEffect(() => {
        if (selectedInquiry && selectedInquiry.status === 'unread') {
            router.patch(getRoute('read', selectedInquiry.id), {}, { 
                preserveScroll: true,
                preserveState: true
            });
        }
    }, [selectedInquiryId]);

    const applyFilters = (newSearch: string, newStatus: string) => {
        router.get(getRoute('index'), {
            search: newSearch || undefined,
            status: newStatus === 'all' ? undefined : newStatus,
        }, { preserveState: true, replace: true });
    };

    const handleSelectInquiry = (id: number) => {
        setSelectedInquiryId(id);
        reset();
    };

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInquiry) return;

        post(getRoute('reply', selectedInquiry.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
            router.delete(getRoute('destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedInquiryId === id) {
                        setSelectedInquiryId(null);
                    }
                }
            });
        }
    };

    const applyTemplate = (text: string) => {
        let processedText = text
            .replace('[Name]', selectedInquiry?.name || 'Customer')
            .replace('[Dealer]', auth?.user?.name || 'Dealer');
        setData('reply_message', processedText);
    };

    const Layout = isDealer ? DealerLayout : AdminLayout;

    return (
        <Layout>
            <Head title={isDealer ? "Inbox — Dealer Inquiries" : "Inbox — Inquiries Admin"} />

            <div className="space-y-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                            <Mail className="h-6 w-6 text-[#1B3462] dark:text-blue-400" /> Inquiry Inbox
                        </h1>
                        <p className="text-muted-foreground text-xs mt-0.5">
                            Manage and reply directly to incoming client import messages
                        </p>
                    </div>
                </div>

                {/* Filters Row */}
                <Card className="shadow-sm border-neutral-200 dark:border-neutral-800">
                    <div className="p-3 flex flex-col md:flex-row md:items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="pl-9 h-9 text-xs rounded-lg border-neutral-200 focus-visible:ring-[#1B3462]"
                                placeholder="Search by name, email, car or message content..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters(search, activeStatus)}
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Button size="sm" className="h-9 text-xs" onClick={() => applyFilters(search, activeStatus)}>Search</Button>
                            {(filters.search || filters.status) && (
                                <Button size="sm" variant="outline" className="h-9 text-xs" onClick={() => { setSearch(''); applyFilters('', 'all'); }}>
                                    Reset Filters
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Main Mailbox Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1 min-h-[600px]">
                    
                    {/* Left Pane: Mailbox List (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                        
                        {/* Mailbox Tabs */}
                        <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold gap-1 select-none">
                            <button
                                onClick={() => applyFilters(search, 'all')}
                                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                                    activeStatus === 'all' 
                                        ? 'bg-white dark:bg-neutral-800 text-[#1B3462] dark:text-white shadow-sm' 
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => applyFilters(search, 'unread')}
                                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    activeStatus === 'unread' 
                                        ? 'bg-white dark:bg-neutral-800 text-[#1B3462] dark:text-white shadow-sm' 
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                                }`}
                            >
                                <Inbox className="h-3.5 w-3.5" />
                                Unread
                            </button>
                            <button
                                onClick={() => applyFilters(search, 'read')}
                                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    activeStatus === 'read' 
                                        ? 'bg-white dark:bg-neutral-800 text-[#1B3462] dark:text-white shadow-sm' 
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                                }`}
                            >
                                <MailOpen className="h-3.5 w-3.5" />
                                Read
                            </button>
                            <button
                                onClick={() => applyFilters(search, 'replied')}
                                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    activeStatus === 'replied' 
                                        ? 'bg-white dark:bg-neutral-800 text-[#1B3462] dark:text-white shadow-sm' 
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                                }`}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Replied
                            </button>
                        </div>

                        {/* List Items Container */}
                        <div className="bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 flex-1 max-h-[560px] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-900 shadow-sm">
                            {inquiries.data.length === 0 ? (
                                <div className="text-center py-16 text-muted-foreground flex flex-col items-center justify-center gap-2">
                                    <Inbox className="h-10 w-10 text-neutral-300" />
                                    <p className="text-sm font-semibold">No inquiries here</p>
                                    <p className="text-xs text-neutral-400">Try changing status tabs or search queries</p>
                                </div>
                            ) : (
                                inquiries.data.map((inquiry) => {
                                    const isSelected = selectedInquiryId === inquiry.id;
                                    const isUnread = inquiry.status === 'unread';
                                    const isReplied = inquiry.status === 'replied';

                                    return (
                                        <div
                                            key={inquiry.id}
                                            onClick={() => handleSelectInquiry(inquiry.id)}
                                            className={`p-3.5 cursor-pointer transition-all flex flex-col gap-1 relative ${
                                                isSelected 
                                                    ? 'bg-neutral-55 dark:bg-neutral-900/60 border-l-4 border-[#1B3462] dark:border-blue-500' 
                                                    : 'hover:bg-neutral-50/70 dark:hover:bg-neutral-900/30 border-l-4 border-transparent'
                                            }`}
                                        >
                                            {/* Status Dot */}
                                            {isUnread && (
                                                <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                            )}

                                            <div className="flex justify-between items-start pr-4">
                                                <span className={`text-xs ${isUnread ? 'font-black text-neutral-900 dark:text-white' : 'font-semibold text-neutral-700 dark:text-neutral-300'}`}>
                                                    {inquiry.name}
                                                </span>
                                                <span className="text-[10px] text-neutral-400">
                                                    {new Date(inquiry.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 text-neutral-550 dark:text-neutral-400">
                                                    {inquiry.inquiry_type}
                                                </span>
                                                {isReplied && (
                                                    <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                                                        <CheckCircle2 className="h-3 w-3" /> Replied
                                                    </span>
                                                )}
                                            </div>

                                            <p className={`text-xs line-clamp-2 mt-0.5 ${isUnread ? 'font-medium text-neutral-850 dark:text-neutral-200' : 'text-neutral-500'}`}>
                                                {inquiry.message}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* List Pagination */}
                        {inquiries.last_page > 1 && (
                            <div className="flex justify-center gap-1 p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-150 dark:border-neutral-800">
                                {inquiries.links.map((link, i) => (
                                    link.url ? (
                                        <Link key={i} href={link.url}
                                            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${link.active ? 'bg-[#1B3462] text-white shadow-sm' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span key={i} className="px-2.5 py-1 text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Right Pane: Mailbox Reader (7 cols) */}
                    <div className="lg:col-span-7 h-full flex flex-col">
                        {selectedInquiry ? (
                            <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-6 shadow-sm h-full flex flex-col">
                                
                                {/* Header Details */}
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-5">
                                    <div className="space-y-1">
                                        <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white uppercase tracking-wider">
                                            {selectedInquiry.name}
                                        </h3>
                                        <div className="text-xs text-neutral-500 space-y-0.5">
                                            <p>Email: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedInquiry.email}</span></p>
                                            {selectedInquiry.phone && (
                                                <p>Phone: <span className="font-semibold text-neutral-700 dark:text-neutral-350">{selectedInquiry.phone}</span></p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end gap-1.5">
                                        <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(selectedInquiry.created_at).toLocaleString()}
                                        </div>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${TOPIC_BADGES[selectedInquiry.inquiry_type] || 'bg-neutral-100 text-neutral-800'}`}>
                                            {selectedInquiry.inquiry_type}
                                        </span>
                                    </div>
                                </div>

                                {/* Vehicle of Interest Panel */}
                                {selectedInquiry.car_of_interest && (
                                    <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-950/20 p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                        <Car className="h-4.5 w-4.5 text-blue-500" />
                                        <span>Vehicle of Interest:</span>
                                        <span className="text-[#1B3462] dark:text-blue-400">{selectedInquiry.car_of_interest}</span>
                                    </div>
                                )}

                                {/* Message Content Box */}
                                <div className="space-y-2 flex-1">
                                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Message</h4>
                                    <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4.5 rounded-xl border border-neutral-150 dark:border-neutral-800 text-sm whitespace-pre-wrap leading-relaxed text-neutral-800 dark:text-neutral-300 min-h-[120px]">
                                        {selectedInquiry.message}
                                    </div>
                                </div>

                                {/* Reply History Log */}
                                {selectedInquiry.reply_text && (
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 className="h-3.5 w-3.5" /> Replied Response History
                                        </h4>
                                        <div className="bg-emerald-50/30 dark:bg-emerald-950/10 p-4.5 rounded-xl border border-emerald-150 dark:border-emerald-950/20 space-y-2.5">
                                            <div className="flex justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                                                <span>{isDealer ? 'Dealer Representative' : 'Admin Care Agent'}</span>
                                                <span>{selectedInquiry.replied_at ? new Date(selectedInquiry.replied_at).toLocaleString() : ''}</span>
                                            </div>
                                            <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed italic">
                                                "{selectedInquiry.reply_text}"
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Compose Reply Form */}
                                <div className="border-t border-neutral-150 dark:border-neutral-800 pt-5 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Reply className="h-4 w-4 text-[#1B3462] dark:text-blue-400" />
                                        <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                            {selectedInquiry.reply_text ? 'Send Another Response' : 'Compose Email Reply'}
                                        </h4>
                                    </div>

                                    <form onSubmit={handleSendReply} className="space-y-3.5">
                                        <div className="text-[10px] text-neutral-500 font-medium">
                                            Recipient: <strong className="text-neutral-800 dark:text-neutral-300">{selectedInquiry.email}</strong>
                                        </div>
                                        
                                        <div className="space-y-1.5">
                                            {/* Quick Response Templates */}
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {QUICK_TEMPLATES.map((tpl, idx) => (
                                                    <Button
                                                        key={idx}
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-[10px] h-7 px-2.5 bg-neutral-50/50 hover:bg-neutral-100 dark:bg-neutral-900/50 dark:hover:bg-neutral-800 border-dashed"
                                                        onClick={() => applyTemplate(tpl.text)}
                                                    >
                                                        {tpl.label}
                                                    </Button>
                                                ))}
                                            </div>

                                            <Textarea
                                                placeholder="Write your email response here..."
                                                rows={4}
                                                required
                                                className="text-xs border-neutral-200 focus-visible:ring-[#1B3462] font-medium leading-relaxed"
                                                value={data.reply_message}
                                                onChange={e => setData('reply_message', e.target.value)}
                                            />
                                            <InputError message={errors.reply_message} />
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="text-xs text-red-650 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20 h-9"
                                                onClick={() => handleDelete(selectedInquiry.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1.5" /> Delete Message
                                            </Button>

                                            <Button
                                                type="submit"
                                                size="sm"
                                                className="h-9 px-4 text-xs font-bold text-white cursor-pointer"
                                                style={{ background: 'linear-gradient(135deg, #1B3462, #ED1C24)' }}
                                                disabled={processing}
                                            >
                                                <Send className="h-3.5 w-3.5 mr-1.5" />
                                                {processing ? 'Sending Email...' : 'Send Response'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm h-full flex flex-col items-center justify-center text-center space-y-3 min-h-[400px]">
                                <div className="h-14 w-14 rounded-full bg-neutral-50 dark:bg-neutral-900 border flex items-center justify-center text-neutral-300 dark:text-neutral-600 shadow-inner">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <h3 className="font-extrabold text-base text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Select an Inquiry</h3>
                                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                                    Choose any email message from the list panel to read detailed parameters, dispatch custom quotes, or clear records.
                                </p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </Layout>
    );
}
