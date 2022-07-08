'use strict';

/**
 * grammar-question router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::grammar-question.grammar-question', {
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