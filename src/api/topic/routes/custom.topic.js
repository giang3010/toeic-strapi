module.exports = {
    routes: [{
            method: 'GET',
            path: '/topics/:id',
            handler: 'topic.findById',
        },
        {
            method: 'GET',
            path: '/topics',
            handler: 'topic.findAll',
        },
    ],
};