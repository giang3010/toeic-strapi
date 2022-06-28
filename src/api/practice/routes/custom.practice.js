module.exports = {
    routes: [{
            method: 'GET',
            path: '/v1/practice/:id',
            handler: 'practice.findById',
        },
        {
            method: 'GET',
            path: '/v1/practice',
            handler: 'practice.findAll',
        },
    ],
};