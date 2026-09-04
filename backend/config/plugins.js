module.exports = ({ env }) => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'zh-Hans',
      locales: ['zh-Hans', 'en'],
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'glosim-jwt-default-secret-key-12345'),
    },
  },
});
