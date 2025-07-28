<?php

namespace Database\Seeders;

use App\Models\Hardness;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HardnessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Hardness::factory()->count(10)->create();
    }
}
