<?php

namespace Database\Factories;

use App\Models\Hardness;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hardness>
 */
class HardnessFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Hardness::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->word(),
            'created_by' => 1, // Change this as per your user table
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
