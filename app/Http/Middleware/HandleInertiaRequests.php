<?php

namespace App\Http\Middleware;

use App\Models\Book;
use App\Models\User;
use App\Policies\BookPolicy;
use App\Policies\UserPolicy;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role' => $request->user()?->roles->pluck('name')[0],
                'permissions' => [
                    'user' => [
                        UserPolicy::ADMINISTER => $request->user()?->can(UserPolicy::ADMINISTER, User::class),
                        UserPolicy::DELETE_SELF => $request->user()?->can(UserPolicy::DELETE_SELF, User::class),
                    ],
                    'book' => [
                        BookPolicy::ADMINISTER => $request->user()?->can(BookPolicy::ADMINISTER, Book::class),
                        BookPolicy::BORROW => $request->user()?->can(BookPolicy::BORROW, Book::class),
                        BookPolicy::VIEW => $request->user()?->can(BookPolicy::VIEW, Book::class),
                    ],
                ],
            ],
        ];
    }
}
