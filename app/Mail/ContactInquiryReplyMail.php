<?php

namespace App\Mail;

use App\Models\ContactInquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactInquiryReplyMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $inquiry;
    public $replyMessage;

    /**
     * Create a new message instance.
     */
    public function __construct(ContactInquiry $inquiry, string $replyMessage)
    {
        $this->inquiry = $inquiry;
        $this->replyMessage = $replyMessage;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $subject = "Re: [" . $this->inquiry->inquiry_type . "] Inquiry Response";
        if ($this->inquiry->car_of_interest) {
            $subject .= " - Regarding " . $this->inquiry->car_of_interest;
        }

        return $this->subject($subject)
                    ->view('emails.inquiry-reply');
    }
}
