module.exports = {
    routes: [{
            method: 'GET',
            path: '/v1/practice/generate/:id',
            handler: 'practice.generate',
        },
        {
            method: 'GET',
            path: '/v1/practice/:id',
            handler: 'practice.findById',
        },
        {
            method: 'GET',
            path: '/v1/practice',
            handler: 'practice.findAll',
        },
        {
            method: 'POST',
            path: '/v1/practice',
            handler: 'practice.createPrac',
        },
    ],
};