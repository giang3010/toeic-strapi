'use strict';

/**
 * practice router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::practice.practice', {
    prefix: '',
    only: ['update', 'delete'],
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