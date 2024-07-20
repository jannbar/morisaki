<?php

namespace Database\Seeders;

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

        // TODO: Refactor permissions/roles to enums!

        // Create permissions.
        Permission::create(['name' => 'create books']);
        Permission::create(['name' => 'update books']);
        Permission::create(['name' => 'delete books']);

        Permission::create(['name' => 'borrow books']);
        Permission::create(['name' => 'manage borrowed books']);

        // Create roles and assign permissions.
        $librarian = Role::create(['name' => 'librarian']);
        $librarian->givePermissionTo(['create books', 'update books', 'delete books', 'manage borrowed books']);

        $member = Role::create(['name' => 'member']);
        $member->givePermissionTo(['borrow books']);

        $super_admin = Role::create(['name' => 'super-admin']);
        $super_admin->givePermissionTo(Permission::all());

        // Create demo users.
        $faker = $this->getFakerInstance();

        $librarian_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'librarian@morisaki.com',
        ]);
        $librarian_user->assignRole($librarian);

        $member_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'member@morisaki.com',
        ]);
        $member_user->assignRole($member);

        $super_admin_user = User::factory()->create([
            'name' => $faker->name(),
            'email' => 'super-admin@morisaki.com',
        ]);
        $super_admin_user->assignRole($super_admin);
    }

    private function getFakerInstance(): \Faker\Generator
    {
        return \Faker\Factory::create();
    }
}
