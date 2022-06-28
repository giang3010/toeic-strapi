'use strict';

/**
 * grammar service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grammar.grammar');
