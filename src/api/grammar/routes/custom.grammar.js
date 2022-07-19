module.exports = {
    routes: [{
            method: 'PATCH',
            path: '/grammars/updateGrammarQuestion/:id',
            handler: 'grammar.updateGrammarQuestion',
        },
        {
            method: 'GET',
            path: '/grammars/:id',
            handler: 'grammar.findById',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
        {
            method: 'GET',
            path: '/grammars',
            handler: 'grammar.findAll',
            config: {
                auth: false,
                middlewares: ['global::partition'],
            },
        },
    ],
};