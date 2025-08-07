export const exams = [
    {
        id: 1,
        title: "Model Test 01 | Admission Test | Fahad's Tutorial",
        subject: "Admission Test",
        description:
            "প্রশ্নপত্রে কোনো ভুল থাকলেও চিন্তা করবে না—পরীক্ষা যাচাইয়ের সময় আমরা সংখ্যা ঠিক করে নেব। সময়ের মধ্যে পরীক্ষা শেষ করার চেষ্টা কর। সৎ থাকবে আর অসদুপায় অবলম্বন করবে না, কারণ এটা তোমার ভবিষ্যতের জন্য সহায়ক হবে।",
        questions: 25,
        totalMarks: 25,
        negativeMarks: "No",
        duration: "20 min",
        startTime: "July 29, 2025 at 7:30 PM",
        endTime: "December 31, 2028 at 7:30 PM",
        questionList: [
            {
                id: 101,
                question: "What is the capital of Bangladesh?",
                option_1: "Chittagong",
                option_2: "Dhaka",
                option_3: "Khulna",
                option_4: "Sylhet",
                correct_option: 2,
                solution_description:
                    "Dhaka is the capital and largest city of Bangladesh. It was established as the capital during the Mughal period.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 102,
                question: "What is 2 + 2?",
                option_1: "3",
                option_2: "4",
                option_3: "5",
                option_4: "6",
                correct_option: 2,
                solution_description:
                    "The sum of 2 and 2 is 4 according to basic arithmetic.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 103,
                question: "Which of these is a prime number?",
                option_1: "4",
                option_2: "6",
                option_3: "7",
                option_4: "8",
                correct_option: 3,
                solution_description:
                    "7 is a prime number because it's only divisible by 1 and itself.",
                question_image: null,
                solution_image: null,
            },
        ],
    },
    {
        id: 2,
        title: "Model Test 02 | Chemistry | Fahad's Tutorial",
        subject: "Chemistry",
        description:
            "0.25 will be deducted for each wrong answer. Don't worry if there are any mistakes in the question paper - we will correct the marks during the exam verification.Try to complete the exam on time. Be honest and don't resort to dishonesty, as this will help you in your future",
        questions: 30,
        totalMarks: 50,
        negativeMarks: "Yes (-0.25)",
        duration: "45 min",
        startTime: "August 15, 2025 at 9:00 AM",
        endTime: "December 31, 2028 at 11:00 AM",
        questionList: [
            {
                id: 201,
                question: "What is the chemical symbol for water?",
                option_1: "H2O",
                option_2: "CO2",
                option_3: "NaCl",
                option_4: "O2",
                correct_option: 1,
                solution_description:
                    "H₂O is the chemical formula for water, indicating two hydrogen atoms bonded to one oxygen atom.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 202,
                question: "Which element has the atomic number 1?",
                option_1: "Helium",
                option_2: "Hydrogen",
                option_3: "Oxygen",
                option_4: "Carbon",
                correct_option: 2,
                solution_description:
                    "Hydrogen is the first element in the periodic table with atomic number 1.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 203,
                question: "What is the pH value of pure water?",
                option_1: "1",
                option_2: "5",
                option_3: "7",
                option_4: "14",
                correct_option: 3,
                solution_description:
                    "Pure water has a neutral pH of 7 at 25°C (77°F).",
                question_image: null,
                solution_image: null,
            },
        ],
    },
];

export const practiceExams = [
    {
        id: 1,
        title: "Practice Test 01 | Admission Test | Fahad's Tutorial",
        subject: "Admission Test",
        description:
            "This practice test will help you prepare for the admission test. Take your time and learn from each question.",
        questions: 25,
        totalMarks: 25,
        negativeMarks: "No",
        duration: "20 min",
        // No startTime or endTime for practice exams
        questionList: [
            {
                id: 101,
                question: "What is the capital of Bangladesh?",
                option_1: "Chittagong",
                option_2: "Dhaka",
                option_3: "Khulna",
                option_4: "Sylhet",
                correct_option: 2,
                solution_description:
                    "Dhaka is the capital and largest city of Bangladesh.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 102,
                question: "What is 2 + 2?",
                option_1: "3",
                option_2: "4",
                option_3: "5",
                option_4: "6",
                correct_option: 2,
                solution_description: "Basic arithmetic addition.",
                question_image: null,
                solution_image: null,
            },
        ],
    },
    {
        id: 2,
        title: "Practice Test 02 | Chemistry | Fahad's Tutorial",
        subject: "Chemistry",
        description:
            "Practice your chemistry knowledge with these questions. No time limit - focus on learning.",
        questions: 30,
        totalMarks: 50,
        negativeMarks: "Yes (-0.25)",
        duration: "45 min",
        // No startTime or endTime for practice exams
        questionList: [
            {
                id: 201,
                question: "What is the chemical symbol for water?",
                option_1: "H2O",
                option_2: "CO2",
                option_3: "NaCl",
                option_4: "O2",
                correct_option: 1,
                solution_description:
                    "Water is composed of two hydrogen atoms and one oxygen atom.",
                question_image: null,
                solution_image: null,
            },
            {
                id: 202,
                question: "Which element has the atomic number 1?",
                option_1: "Helium",
                option_2: "Hydrogen",
                option_3: "Oxygen",
                option_4: "Carbon",
                correct_option: 2,
                solution_description:
                    "Hydrogen is the lightest and first element in the periodic table.",
                question_image: null,
                solution_image: null,
            },
        ],
    },
];
