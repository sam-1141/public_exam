export const courses = [
    { id: "science", name: "বিজ্ঞান" },
    { id: "commerce", name: "বাণিজ্য" },
    { id: "arts", name: "মানবিক" },
]

export const subjectsByCourse = {
    science: [
        { id: "physics", name: "পদার্থবিজ্ঞান" },
        { id: "chemistry", name: "রসায়ন" },
        { id: "math", name: "উচ্চতর গণিত" },
        { id: "biology", name: "জীববিজ্ঞান" },
        { id: "bangla", name: "বাংলা" },
        { id: "english", name: "English" },
    ],
    commerce: [
        { id: "accounting", name: "হিসাববিজ্ঞান" },
        { id: "management", name: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা" },
        { id: "economics", name: "অর্থনীতি" },
        { id: "finance", name: "ফিন্যান্স ও ব্যাংকিং" },
        { id: "bangla", name: "বাংলা" },
        { id: "english", name: "English" },
    ],
    arts: [
        { id: "bangla", name: "বাংলা" },
        { id: "english", name: "English" },
        { id: "history", name: "ইতিহাস" },
        { id: "geography", name: "ভূগোল" },
        { id: "civics", name: "পৌরনীতি ও সুশাসন" },
        { id: "economics", name: "অর্থনীতি" },
    ],
}