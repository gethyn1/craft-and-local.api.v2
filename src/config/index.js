export default {
  WEB_PORT: process.env.PORT,
  CORS_WEB_APP_ORIGIN: process.env.CORS_WEB_APP_ORIGIN,
  APP_NAME: 'Craft & Local API V2',
  BASE_PATH: '',
  isProd: process.env.NODE_ENV === 'production',
  DEBUG: false,
}
