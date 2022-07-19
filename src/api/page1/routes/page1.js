'use strict';

/**
 * partition router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::page1.page1', {
    prefix: '',
    only: ['create', 'delete', 'update'],
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