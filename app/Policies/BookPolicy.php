<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookPolicy
{
    public const ADMINISTER = 'administer';

    public const BORROW = 'borrow';

    public const VIEW = 'view';

    use HandlesAuthorization;

    /**
     * Determine whether a user can administer books.
     */
    public function administer(User $user): bool
    {
        return $user->can(['create books', 'update books', 'delete books', 'administer borrowed books']);
    }

    /**
     * Determine whether a user can borrow any books.
     */
    public function borrow(User $user): bool
    {
        return $user->can('borrow books');
    }

    /**
     * Determine whether a user can view any books.
     */
    public function view(?User $user): bool
    {
        return true;
    }
}
