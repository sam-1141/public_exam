<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\QuestionTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
        ]);

        $validatedData['created_by'] = Auth::id();
        Tag::create($validatedData);

        return redirect()->route('manage.material')
            ->with('success', 'Tag created successfully!');
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        // Check if the authenticated user is the creator of the tag
        if ($tag->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to update this tag.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $id,
        ]);

        $tag->update($validatedData);

        return redirect()->route('manage.material')
            ->with('success', 'Tag updated successfully!');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);

        if ($tag->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to delete this tag.');
        }

        $relatedCount = QuestionTag::where('tag_id', $id)->count();

        if ($relatedCount > 0) {
            return redirect()->route('manage.material')
                ->with('warning', "This tag is related to $relatedCount questions.");
        }

        $tag->delete();

        return redirect()->route('manage.material')
            ->with('success', 'Tag deleted successfully!');
    }
}
