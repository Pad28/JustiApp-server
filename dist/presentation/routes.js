"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./user/routes");
const routes_2 = require("./auth/routes");
const routes_3 = require("./justificante/routes");
const routes_4 = require("./upload/routes");
const routes_5 = require("./grupo/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', routes_2.AuthRoutes.routes);
        router.use('/api/grupo', routes_5.GrupoRoutes.routes);
        router.use('/api/justificante', routes_3.JustificanteRoutes.routes);
        router.use('/api/upload', routes_4.UploadRoutes.routes);
        router.use('/api/user', routes_1.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
