module.exports = {
    routes: [{
            method: 'PATCH',
            path: '/grammars/updateGrammarQuestion/:id',
            handler: 'grammar.updateGrammarQuestion',
        },
        {
            method: 'GET',
            path: '/grammars/list',
            handler: 'grammar.findList',
        },
        {
            method: 'GET',
            path: '/grammars/:id',
            handler: 'grammar.findById',
        },
        {
            method: 'GET',
            path: '/grammars',
            handler: 'grammar.findAll',
        },
    ],
};