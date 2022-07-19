module.exports = {
    routes: [{
            method: 'GET',
            path: '/page1s/:id',
            handler: 'page1.findById',
        },
        {
            method: 'GET',
            path: '/page1s',
            handler: 'page1.findAll',
        },
    ],
};