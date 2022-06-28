'use strict';

/**
 * exam-log service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exam-log.exam-log');
