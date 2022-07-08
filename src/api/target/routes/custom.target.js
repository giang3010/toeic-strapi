module.exports = {
    routes: [{
            method: 'GET',
            path: '/targets/:id',
            handler: 'target.findById',
        },
        {
            method: 'GET',
            path: '/targets',
            handler: 'target.findAll',
        },
    ],
};