<?php

namespace App\Http\Controllers;

use App\Models\ContactInquiry;
use App\Mail\ContactInquiryReplyMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactInquiryController extends Controller
{
    /**
     * Display a listing of contact inquiries for admins.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user || (!$user->isAdmin() && !$user->isModerator() && !$user->isDealer())) {
            abort(403, 'Unauthorized.');
        }

        $query = ContactInquiry::query()->with('car');

        if ($user->isDealer()) {
            $query->where('dealer_id', $user->id);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%')
                  ->orWhere('inquiry_type', 'like', '%' . $request->search . '%')
                  ->orWhere('car_of_interest', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status') && in_array($request->status, ['unread', 'read', 'replied'])) {
            $query->where('status', $request->status);
        }

        $inquiries = $query->orderBy('created_at', 'desc')
            ->paginate(25) // slightly larger page size for email inbox style
            ->withQueryString();

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'filters'   => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Store a newly created contact inquiry in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'phone'           => 'nullable|string|max:50',
            'inquiry_type'    => 'required|string|max:100',
            'car_of_interest' => 'nullable|string|max:255',
            'message'         => 'required|string',
            'car_id'          => 'nullable|exists:cars,id',
        ]);

        $validated['status'] = 'unread'; // Explicitly set status to unread on store

        if (!empty($validated['car_id'])) {
            $car = \App\Models\Car::find($validated['car_id']);
            if ($car) {
                $validated['dealer_id'] = $car->user_id;
            }
        }

        ContactInquiry::create($validated);

        return back()->with('success', 'Your inquiry has been submitted successfully.');
    }

    /**
     * Mark the specified contact inquiry as read.
     */
    public function markAsRead(ContactInquiry $inquiry)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isModerator() && $inquiry->dealer_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        if ($inquiry->status === 'unread') {
            $inquiry->update(['status' => 'read']);
        }

        return back()->with('success', 'Inquiry marked as read.');
    }

    /**
     * Reply to the contact inquiry via email.
     */
    public function reply(Request $request, ContactInquiry $inquiry)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isModerator() && $inquiry->dealer_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'reply_message' => 'required|string|min:5',
        ]);

        // Send the reply email
        Mail::to($inquiry->email)->send(new ContactInquiryReplyMail($inquiry, $request->reply_message));

        // Update inquiry status and log response details
        $inquiry->update([
            'status' => 'replied',
            'reply_text' => $request->reply_message,
            'replied_at' => now(),
        ]);

        return back()->with('success', 'Reply sent successfully via email.');
    }

    /**
     * Remove the specified contact inquiry from database.
     */
    public function destroy(ContactInquiry $inquiry)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isModerator() && $inquiry->dealer_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $inquiry->delete();

        return back()->with('success', 'Inquiry deleted successfully.');
    }
}
