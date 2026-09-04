'use strict';

const { seedDatabase } = require('./bootstrap-seed');

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      // 1. Configure Public role read-only permissions for public API consumption
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const apis = ['global', 'home-page', 'org-overview', 'leader', 'member-institution', 'conference', 'notice'];
        const actionsToEnable = [];

        for (const api of apis) {
          actionsToEnable.push(`api::${api}.${api}.find`);
          actionsToEnable.push(`api::${api}.${api}.findOne`);
        }

        const permissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
              action: { $in: actionsToEnable },
            },
          });

        const existingActions = new Set(permissions.map((p) => p.action));

        for (const action of actionsToEnable) {
          if (!existingActions.has(action)) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
          }
        }
      }

      // 2. Seed initial SQLite database content if clean
      await seedDatabase(strapi);
    } catch (err) {
      strapi.log.warn('Could not auto-configure bootstrap permissions/seeding: ' + err.message);
    }
  },
};
