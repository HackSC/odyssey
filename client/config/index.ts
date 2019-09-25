export const isProd = process.env.NODE_ENV === 'production';
export const apiHost = isProd ? process.env.API_PROD_HOST : 'http://localhost:5000';