'use strict';

/**
 * vocab-question router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::vocab-question.vocab-question', {
    prefix: '',
    except: ['find', 'findOne'],
    config: {
        find: {},
        findOne: {},
        create: {},
        update: {},
        delete: {},
    },
});