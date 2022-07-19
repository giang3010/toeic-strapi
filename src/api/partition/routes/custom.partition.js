module.exports = {
    routes: [{
            method: 'GET',
            path: '/partitions',
            handler: 'partition.findAll',
        },
        {
            method: 'POST',
            path: '/partitions',
            handler: 'partition.create',
        },
    ],
};