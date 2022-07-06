'use strict';

/**
 * vocabulary router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::vocabulary.vocabulary', {
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