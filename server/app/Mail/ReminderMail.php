<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\User;
use \App\Models\Visit;

class ReminderMail extends Mailable
{
    use Queueable, SerializesModels;
    /**
     * The order instance.
     *
     * @var \App\Models\User
     */
    protected $user;
    /**
     * The order instance.
     *
     * @var \App\Models\Visit
     */
    protected $visit;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Visit $visit, User $user)
    {
        $this->user = $user;
        $this->visit = $visit;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.reminder')
            ->with([
                'email' => $this->user->email,
                'name' => $this->user->name,
                'lastName' => $this->user->lastname,
                'visitStart' => $this->visit->start

            ]);
    }
}
