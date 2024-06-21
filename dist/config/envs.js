"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
    GMAIL_DIRECCION: (0, env_var_1.get)('GMAIL_DIRECCION').required().asString(),
    GMAIL_KEY: (0, env_var_1.get)('GMAIL_KEY').required().asString(),
    API_SERVICE: (0, env_var_1.get)('API_SERVICE').required().asString(),
    USER_ADMIN: (0, env_var_1.get)('USER_ADMIN').required().asString(),
    PASSWORD_ADMIN: (0, env_var_1.get)('PASSWORD_ADMIN').required().asString(),
    HTTPS: (0, env_var_1.get)('HTTPS').default("false").asBool(),
    HTTPS_KEY: (0, env_var_1.get)("HTTPS_KEY").required().asString(),
    HTTPS_CERT: (0, env_var_1.get)("HTTPS_CERT").required().asString(),
};
