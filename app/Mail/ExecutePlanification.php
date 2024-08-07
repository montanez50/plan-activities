<?php

namespace App\Mail;

use App\Models\Dependency;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ExecutePlanification extends Mailable
{
    use Queueable, SerializesModels;

    protected $toUser;

    /**
     * Create a new message instance.
     */
    public function __construct(protected User $user)
    {
        $dependency_user = Dependency::where('id', $user->dependency->id)->first()->user_id;
        $toUser = User::find($dependency_user);
        $this->toUser = $toUser;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Planificación Ejecutada',
            to: $this->toUser->email,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.main',
            with: [
                'user' => $this->toUser,
                'text' => "El usuario {$this->user->name} {$this->user->last_name} ah ejecutado una planificación"
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
