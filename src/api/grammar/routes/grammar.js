'use strict';

/**
 * grammar router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::grammar.grammar', {
    prefix: '',
    except: ['find', 'fineOne'],
    only: ['create', 'update', 'delete'],
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        findOne: {
            auth: false,
        },
        create: {
            auth: false,
        },
        update: {
            auth: false,
        },
        delete: {
            auth: false,
        },
    },
});