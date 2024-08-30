export const PORT = process.env.PORT || 3000;
export const DATABASE_HOST = process.env.DB_HOST || 'localhost';
export const DATABASE_USER = process.env.DB_USER || 'postgres';
export const DATABASE_PASSWORD = process.env.DB_PASSWORD || '123456';
export const DATABASE_NAME = process.env.DB_NAME || 'railway';
export const DATABASE_PORT = process.env.DB_PORT || 5432;

export const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

export const DB_PORT = process.env.PORT || 3005