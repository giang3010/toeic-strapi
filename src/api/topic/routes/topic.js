'use strict';

/**
 * topic router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::topic.topic', {
    prefix: '',
    only: ['create', 'update', 'delete'],
    except: ['find', 'findOne'],
    config: {
        find: {
            auth: false,
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