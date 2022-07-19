module.exports = {
    routes: [{
            method: 'POST',
            path: '/questions/list',
            handler: 'question.findListByIds',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
        {
            method: 'GET',
            path: '/questions/:id',
            handler: 'question.findById',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },

        {
            method: 'GET',
            path: '/questions',
            handler: 'question.findAll',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },

        {
            method: 'POST',
            path: '/questions/mixQuestion',
            handler: 'question.createMixQuestion',
        },
        {
            method: 'PATCH',
            path: '/questions/mixQuestion/:id',
            handler: 'question.updateMixQuestion',
        },
    ],
};