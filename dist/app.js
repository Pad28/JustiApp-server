"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
const routes_1 = require("./presentation/routes");
const config_1 = require("./config");
const data_1 = require("./data");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, data_1.conectionDB)();
    const server = new server_1.Server({
        port: config_1.envs.PORT,
        publicPaht: config_1.envs.PUBLIC_PATH,
        routes: routes_1.AppRoutes.routes,
        isHttps: config_1.envs.HTTPS,
        https_cert: config_1.envs.HTTPS_CERT,
        https_key: config_1.envs.HTTPS_KEY,
    });
    server.start();
}))();
