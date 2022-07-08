module.exports = {
    routes: [{
            method: 'GET',
            path: '/grammar-questions/:id',
            handler: 'grammar-question.findById',
        },
        {
            method: 'GET',
            path: '/grammar-questions',
            handler: 'grammar-question.findAll',
        },
    ],
};