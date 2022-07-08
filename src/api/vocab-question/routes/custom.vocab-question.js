module.exports = {
    routes: [{
            method: 'GET',
            path: '/vocab-questions/:id',
            handler: 'vocab-question.findById',
        },
        {
            method: 'GET',
            path: '/vocab-questions',
            handler: 'vocab-question.findAll',
        },
    ],
};