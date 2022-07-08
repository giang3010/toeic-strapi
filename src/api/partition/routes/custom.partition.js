module.exports = {
    routes: [{
        method: 'GET',
        path: '/partitions',
        handler: 'partition.findAll',
    }, ],
};