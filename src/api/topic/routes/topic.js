'use strict';

/**
 * topic router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::topic.topic', {
    prefix: '',
    except: [],
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