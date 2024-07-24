<?php

namespace App\Policies;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    public const ADMINISTER_STAFF = 'administerStaff';

    public const ADMINISTER_MEMBERS = 'administerMembers';

    public const DELETE_SELF = 'deleteSelf';

    use HandlesAuthorization;

    /**
     * Determine whether the current user can administer staff.
     */
    public function administerStaff(User $user): bool
    {
        return $user->can(PermissionsEnum::ADMINISTER_STAFF->value);
    }

    /**
     * Determine whether the current user can administer members.
     */
    public function administerMembers(User $user): bool
    {
        return $user->can(PermissionsEnum::ADMINISTER_MEMBERS->value);
    }

    /**
     * Determine whether the current user can delete himself.
     */
    public function deleteSelf(User $user): bool
    {
        return $user->hasRole(RolesEnum::MEMBER);
    }
}
