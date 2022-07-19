'use strict';

/**
 * partition router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::partition.partition', {
    prefix: '',
    only: ['findOne', 'delete', 'update'],
    except: ['find', 'create'],
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