import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    GMAIL_DIRECCION: get('GMAIL_DIRECCION').required().asString(), 
    GMAIL_KEY: get('GMAIL_KEY').required().asString(),
    API_SERVICE: get('API_SERVICE').required().asString(),
    USER_ADMIN: get('USER_ADMIN').required().asString(),
    PASSWORD_ADMIN: get('PASSWORD_ADMIN').required().asString(),
}
