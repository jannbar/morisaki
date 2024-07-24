<?php

namespace App\Enums;

enum RolesEnum: string
{
    case SUPER_ADMIN = 'super-admin';
    case LIBRARIAN = 'librarian';
    case MEMBER = 'member';

    public function label(): string
    {
        return match ($this) {
            self::LIBRARIAN => 'Librarian',
        };
    }
}
