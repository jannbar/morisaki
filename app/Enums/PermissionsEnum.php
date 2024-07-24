<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    // Book related permissions.
    case ADMINISTER_BOOKS = 'administer books';
    case BORROW_BOOKS = 'borrow books';

    // User related permissions.
    case ADMINISTER_MEMBERS = 'administer members';
    case ADMINISTER_STAFF = 'administer staff';
}
