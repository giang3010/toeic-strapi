module.exports = {
    routes: [{
            method: 'GET',
            path: '/topics/:id',
            handler: 'topic.findById',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
        {
            method: 'GET',
            path: '/topics',
            handler: 'topic.findAll',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
    ],
};