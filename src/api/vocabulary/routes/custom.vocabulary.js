module.exports = {
    routes: [{
            method: 'PATCH',
            path: '/vocabularies/updateVocabQuestion/:id',
            handler: 'vocabulary.updateVocabQuestion',
        },
        {
            method: 'POST',
            path: '/vocabularies/list',
            handler: 'vocabulary.findByListIds',
        },

        {
            method: 'GET',
            path: '/vocabularies/:id',
            handler: 'vocabulary.findById',
        },
        {
            method: 'GET',
            path: '/vocabularies',
            handler: 'vocabulary.findAll',
        },
    ],
};