<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPasswordOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;
    public $expiryTime;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($otp, $expiryTime)
    {
        $this->otp = $otp;
        $this->expiryTime = $expiryTime;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('FT - Password Reset OTP')
                    ->view('emails.forgot_password_otp');
    }
}
