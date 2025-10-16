<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModuleActive
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // utilisateur connecté
        $route = $request->route();

        // Vérifie si le middleware reçoit un module_id
        $moduleId = $route->parameter('module_id') ?? $route->parameter('id');

        if (!$moduleId) {
            return response()->json([
                'error' => 'Module ID is missing in the route.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $isActive = \DB::table('user_modules')
            ->where('user_id', $user->id)
            ->where('module_id', $moduleId)
            ->where('is_active', true)
            ->exists();

        if (!$isActive) {
            return response()->json([
                'error' => 'Module inactive. Please activate this module to use it.'
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
