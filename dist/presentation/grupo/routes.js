"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const data_1 = require("../../data");
class GrupoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.GrupoController(new services_1.GrupoService());
        router.get('/', controller.getGrupos);
        router.post('/', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            auth_middleware_1.AuthMiddleware.verificarRol(data_1.UserRolDB.ADMIN)
        ], controller.createGrupo);
        router.put('/:id', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            auth_middleware_1.AuthMiddleware.verificarRol(data_1.UserRolDB.ADMIN)
        ], controller.updateGrupo);
        return router;
    }
}
exports.GrupoRoutes = GrupoRoutes;
