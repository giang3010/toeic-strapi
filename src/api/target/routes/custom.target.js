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
        {
            method: 'POST',
            path: '/targets',
            handler: 'target.setTarget',
        },
        // {
        //     method: 'PUT',
        //     path: '/targets/:id',
        //     handler: 'target.updatePoint',
        // },
    ],
};