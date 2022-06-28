'use strict';

/**
 * practice-log service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::practice-log.practice-log');
