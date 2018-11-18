export default {
  WEB_PORT: process.env.PORT,
  CORS_WEB_APP_ORIGIN: process.env.CORS_WEB_APP_ORIGIN,
  APP_NAME: 'Craft & Local API V2',
  BASE_PATH: '',
  IS_PROD: process.env.NODE_ENV === 'production',
  DEBUG: false,
  S3_KEY: process.env.S3_KEY,
  S3_SECRET: process.env.S3_SECRET,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  JWT_SECRET: process.env.JWT_SECRET,
}
