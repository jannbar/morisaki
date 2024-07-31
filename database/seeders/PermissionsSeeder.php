<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /*
    * Create the initial roles and permissions.
    */
    public function run(): void
    {
        // Reset cached roles and permissions.
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions.
        foreach (PermissionsEnum::cases() as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions.
        $super_admin = Role::create(['name' => RolesEnum::SUPER_ADMIN->value]);

        $librarian = Role::create(['name' => RolesEnum::LIBRARIAN->value]);
        $librarian->givePermissionTo([PermissionsEnum::ADMINISTER_BOOKS, PermissionsEnum::ADMINISTER_MEMBERS]);

        $member = Role::create(['name' => RolesEnum::MEMBER->value]);
        $member->givePermissionTo(PermissionsEnum::BORROW_BOOKS);

        // Create demo users.
        $faker = $this->getFakerInstance();

        $super_admin_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'super-admin@morisaki.com',
        ]);
        $super_admin_user->assignRole(RolesEnum::SUPER_ADMIN);

        $librarian_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'librarian@morisaki.com',
        ]);
        $librarian_user->assignRole(RolesEnum::LIBRARIAN);

        $member_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'member@morisaki.com',
        ]);
        $member_user->assignRole(RolesEnum::MEMBER);
    }

    private function getFakerInstance(): \Faker\Generator
    {
        return \Faker\Factory::create();
    }
}
