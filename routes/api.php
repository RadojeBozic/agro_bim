<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\GazdinstvoController;
use App\Http\Controllers\Api\DokumentController;
use App\Http\Controllers\Api\KontaktController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\VestController;
use App\Http\Controllers\Api\SmartAuthController;
use App\Http\Controllers\Api\ProductController;
use App\Models\ProductCategory;


    Route::get('/ping', function () {
        return response()->json(['message' => 'Laravel API radi!']);
    });
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/korisnici', [AdminUserController::class, 'index']);
    Route::put('/admin/korisnici/{id}', [AdminUserController::class, 'update']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/gazdinstva', [GazdinstvoController::class, 'index']);
    Route::post('/gazdinstva', [GazdinstvoController::class, 'store']);
    Route::post('/dokumenti', [DokumentController::class, 'store']);
    Route::get('/dokumenti/{gazdinstvo_id}', [DokumentController::class, 'show']);
    Route::delete('/dokumenti/{id}', [DokumentController::class, 'destroy']);
    Route::post('/kontakt', [KontaktController::class, 'store']);
    Route::get('/kontakt/poslednje', [KontaktController::class, 'poslednje']); // admin pregled
    

    Route::get('/admin/statistika', function () {
        return response()->json([
            'korisnika' => \App\Models\User::count(),
            'poruka' => \App\Models\KontaktPoruka::count(),
            'gazdinstava' => \App\Models\Gazdinstvo::count(),
            'dokumenata' => \App\Models\Dokument::count(),
        ]);
    }); 
});

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/vesti', [VestController::class, 'index']);
            Route::post('/vesti', [VestController::class, 'store']);
            Route::put('/vesti/{vest}', [VestController::class, 'update']);
            Route::delete('/vesti/{vest}', [VestController::class, 'destroy']);
        });
        
        Route::prefix('smart')->group(function () {
            Route::post('/register', [SmartAuthController::class, 'register']);
            Route::post('/login', [SmartAuthController::class, 'login']);
        
            Route::middleware('auth:sanctum')->group(function () {
                Route::get('/me', [SmartAuthController::class, 'me']);
                Route::post('/logout', [SmartAuthController::class, 'logout']);
            });
        });
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store'])->middleware('auth:sanctum');

        Route::get('/products/{id}', [ProductController::class, 'show']);
        Route::put('/products/{id}/feature', [ProductController::class, 'feature'])->middleware('auth:sanctum');
        Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
        Route::get('/categories', function () {
            return ProductCategory::whereNull('parent_id')
                ->with('children')
                ->orderBy('name')
                ->get();
        });
        Route::get('/categories-with-count', function () {
            return ProductCategory::whereNull('parent_id')
                ->with(['children' => function ($q) {
                    $q->withCount('products');
                }])
                ->get();
        });
        Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
       
        

        
