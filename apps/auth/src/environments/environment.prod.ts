export const environment = {
  production: true,
  gateways: {
    users: {
      baseUrl: process.env['NX_GATEWAYS_USERS_BASE_URL'],
      gqlUrl: `${process.env['NX_GATEWAYS_USERS_URL']}`,
    },
  },
};
