'use strict';

/**
 * question router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::question.question', {
    prefix: '',
    only: [],
    except: ['find', 'findOne'],
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        findOne: {},
        create: {},
        update: {},
        delete: {},
    },
});