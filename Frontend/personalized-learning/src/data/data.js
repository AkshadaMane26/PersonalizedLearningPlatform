import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";

export const navigationLinks = [
    { id: 1, title: 'AI-Generated Quizzes & Tests', image: iconsImgs.bills, link: '/dashboard/student/quizzes' },
    { id: 2, title: 'Achievements & Rewards', image: iconsImgs.plane, link: '/dashboard/student/achievements' },
    { id: 3, title: 'AI Recommendations', image: iconsImgs.wallet, link: '/dashboard/student/recommendation' },
    { id: 4, title: 'Generate Study Material', image: iconsImgs.wallet, link: '/dashboard/student/studymaterial' },
    { id: 5, title: 'Dashboard', image: iconsImgs.home, link: '/dashboard/student' },
    { id: 6, title: 'Virtual AI Tutor & Chatbot', image: iconsImgs.wealth, link: '/dashboard/student/chatbot' },
    { id: 7, title: 'Student Profile', image: iconsImgs.user, link: '/dashboard/student/profile' },
];

export const achievements = [
    {
        id: 11,
        title: "🏆 Top Performer of the Month",
        description: "Awarded for outstanding performance in AI & ML.",
        date: "23/12/04",
        points: 500
    },
    {
        id: 12,
        title: "🎖️ Consistent Learner",
        date: "23/07/21",
    },
    {
        id: 13,
        title: "⏩ Speed Learner",
        date: "23/10/05",
    }
];


export const performanceReport = [
    {
        id: 1,
        month: "Jan",
        quizScore: 80,          // Quiz Score %
        engagementLevel: 70,    // Engagement Level %
        studyTime: 30           // Study time in hours
    },
    {
        id: 2,
        month: "Feb",
        quizScore: 85,
        engagementLevel: 75,
        studyTime: 35
    },
    {
        id: 3,
        month: "Mar",
        quizScore: 78,
        engagementLevel: 65,
        studyTime: 28
    },
    {
        id: 4,
        month: "Apr",
        quizScore: 90,
        engagementLevel: 80,
        studyTime: 40
    },
    {
        id: 5,
        month: "May",
        quizScore: 88,
        engagementLevel: 78,
        studyTime: 38
    }
];


export const learningGoals = [
    {
        id: 1,
        subject: "Mathematics",
        goal: "Algebra & Geometry",
        progress: 5,
        target: 10
    },
    {
        id: 2,
        subject: "Science",
        goal: "Physics & Chemistry",
        progress: 7,
        target: 12
    },
    {
        id: 3,
        subject: "Programming",
        goal: "Python & Data Structures",
        progress: 4,
        target: 8
    },
    {
        id: 4,
        subject: "AI & ML",
        goal: "Neural Networks",
        progress: 3,
        target: 6
    }
];


export const leaderboardData = [
    {
        id: 1,
        name: "Akshada Mane",
        score: 950,
        rank: 1
    },
    {
        id: 2,
        name: "Rahul Sharma",
        score: 920,
        rank: 2
    },
    {
        id: 3,
        name: "Priya Verma",
        score: 890,
        rank: 3
    },
    {
        id: 4,
        name: "Amit Kumar",
        score: 860,
        rank: 4
    },
    {
        id: 5,
        name: "Sneha Patil",
        score: 830,
        rank: 5
    }
];


export const learningRecommendations = {
    message: "Based on your quiz performance, we recommend revising the 'Neural Networks' module.",
};




