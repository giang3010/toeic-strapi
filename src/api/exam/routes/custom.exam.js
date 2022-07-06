module.exports = {
    routes: [{
            method: 'GET',
            path: '/v1/exams/listlog/:pointLadder',
            handler: 'exam.listLog',
        },
        {
            method: 'GET',
            path: '/exams/generate/:id',
            handler: 'exam.generateExam',
        },
        {
            method: 'GET',
            path: '/exams/leveltest/:id',
            handler: 'exam.generateLevelTest',
        },
        {
            method: 'GET',
            path: '/exams/inputtest',
            handler: 'exam.generateInputTest',
        },
        {
            method: 'GET',
            path: '/exams/:id',
            handler: 'exam.findById',
        },
        {
            method: 'GET',
            path: '/exams',
            handler: 'exam.findAll',
        },
    ],
};