<?php

namespace App\Http\Controllers;

use App\Models\Hardness;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HardnessController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:hardness,name',
        ]);
        $validatedData['created_by'] = Auth::id();

        Hardness::create($validatedData);

        return redirect()->route('manage.material')
            ->with('success', 'Hardness created successfully!');
    }

    public function update(Request $request, $id)
    {
        $hardness = Hardness::findOrFail($id);

        // Check if the authenticated user is the creator of the hardness level
        if ($hardness->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to update this hardness level.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:hardness,name,' . $id,
        ]);

        $hardness->update($validatedData);

        return redirect()->route('manage.material')
            ->with('success', 'Hardness level updated successfully!');
    }

    public function destroy($id)
    {
        $hardness = Hardness::findOrFail($id);

        if ($hardness->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to delete this hardness level.');
        }

        $relatedCount = Question::where('hardness_id', $id)->count();

        if ($relatedCount > 0) {
            return redirect()->route('manage.material')
                ->with('warning', "This hardness level is related to $relatedCount questions.");
        }

        $hardness->delete();

        return redirect()->route('manage.material')
            ->with('success', 'Hardness level deleted successfully!');
    }
}
