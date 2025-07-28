<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Topic;
use App\Models\Chapter;
use App\Models\Subject;
use App\Models\Hardness;
use App\Models\StudentClass;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'chapter_id' => 'required|integer',
            'name' => 'required|string|max:255',
        ]);

        $validatedData['created_by'] = Auth::id();


        Topic::create($validatedData);

        $tags = Tag::orderBy('id', 'desc')->get();
        $topics = Topic::with(['chapter' => function ($q) {
            return $q->with(['subject' => function ($q) {
                return $q->with('class');
            }]);
        }])->orderBy('id', 'desc')->get();
        $hardness = Hardness::orderBy('id', 'desc')->get();

        $classes = StudentClass::all();
        $subjects = Subject::all();
        $chapters = Chapter::all();

        return redirect()->route('manage.material', ['tags' => $tags, 'topics' => $topics, 'hardness' => $hardness, 'classes' => $classes, 'subjects' => $subjects, 'chapters' => $chapters])
            ->with('success', 'Tag created successfully!');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'chapter_id' => 'required|integer',
            'name' => 'required|string|max:255',
        ]);

        $topic = Topic::findOrFail($id);

        // Check if the authenticated user is the creator of the topic
        if ($topic->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to update this topic.');
        }

        $topic->update($validatedData);

        return redirect()->route('manage.material')
            ->with('success', 'Topic updated successfully!');
    }

    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);

        // Check if the authenticated user is the creator of the topic
        if ($topic->created_by !== Auth::id()) {
            return redirect()->route('manage.material')
                ->with('error', 'You are not authorized to delete this topic.');
        }

        $relatedCount = Question::where('topic_id', $id)->count();

        if ($relatedCount > 0) {
            return redirect()->route('manage.material')
                ->with('warning', "This topic is related to $relatedCount questions.");
        }

        $topic->delete();

        return redirect()->route('manage.material')
            ->with('success', 'Topic deleted successfully!');
    }
}
