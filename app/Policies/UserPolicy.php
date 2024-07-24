<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    public const ADMINISTER = 'administer';

    public const DELETE_SELF = 'deleteSelf';

    use HandlesAuthorization;

    /**
     * Determine whether the current user can administer users.
     */
    public function administer(User $user): bool
    {
        return $user->can('administer users');
    }

    /**
     * Determine whether the current user can delete himself.
     */
    public function deleteSelf(User $user): bool
    {
        return $user->hasRole('member');
    }
}
