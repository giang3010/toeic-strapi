module.exports = {
    routes: [{
            method: 'GET',
            path: '/v1/questions/list',
            handler: 'question.findListByIds',
        },
        {
            method: 'GET',
            path: '/v1/questions',
            handler: 'question.findAll',
        },
    ],
};