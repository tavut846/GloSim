module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'admin-jwt-secret-default-key-12345'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'api-token-salt-default-key-12345'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'transfer-token-salt-default-key-12345'),
    },
  },
});
