<?php

namespace App\Http\Controllers;

use App\Models\Module;

class ModuleController extends Controller {
    public function index() {
        return response()->json(Module::all());
    }
}
