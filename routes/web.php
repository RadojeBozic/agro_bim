<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/proba', function () {
    return 'Laravel radi rute iz web.php!';
});
