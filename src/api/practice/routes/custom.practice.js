module.exports = {
    routes: [{
            method: 'GET',
            path: '/practice/generate/:id',
            handler: 'practice.generate',
        },
        {
            method: 'GET',
            path: '/practice/:id',
            handler: 'practice.findById',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
        {
            method: 'GET',
            path: '/practices',
            handler: 'practice.findAll',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
        {
            method: 'POST',
            path: '/practices',
            handler: 'practice.createPrac',
        },
    ],
};