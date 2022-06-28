'use strict';

/**
 * grammar router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::grammar.grammar');
