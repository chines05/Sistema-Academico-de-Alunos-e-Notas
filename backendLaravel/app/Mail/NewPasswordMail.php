<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tempPassword;
    public $aluno;

    public function __construct($tempPassword, $aluno)
    {
        $this->tempPassword = $tempPassword;
        $this->aluno = $aluno;
    }

    public function build()
    {
        return $this->subject('Sua nova senha temporária')
            ->view('emails.new-password')
            ->with([
                'tempPassword' => $this->tempPassword,
                'aluno' => $this->aluno,
            ]);
    }
}
