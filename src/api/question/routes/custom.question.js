module.exports = {
    routes: [{
            method: 'POST',
            path: '/questions/list',
            handler: 'question.findListByIds',
        },
        {
            method: 'GET',
            path: '/questions/:id',
            handler: 'question.findById',
        },

        {
            method: 'GET',
            path: '/questions',
            handler: 'question.findAll',
            // config: {
            //     auth: false,
            //     middlewares: ['global::query'],
            // },
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