'use strict';

/**
 * target router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::target.target', {
    prefix: '',
    only: ['delete', 'update'],
    except: ['find', 'findOne', 'create'],
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