<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Hardness;
use App\Models\StudentClass;
use App\Models\Subject;
use App\Models\Tag;
use App\Models\Topic;
use Inertia\Inertia;

class MaterialsController extends Controller
{
    public function index()
    {
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

        return Inertia::render('Materials/ManageMaterials', [
            'tags' => $tags,
            'topics' => $topics,
            'hardness' => $hardness,
            'classes' => $classes,
            'subjects' => $subjects,
            'chapters' => $chapters,
        ]);
    }
}
