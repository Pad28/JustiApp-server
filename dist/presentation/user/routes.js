"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const data_1 = require("../../data");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController(new services_1.UserService());
        router.post('/alumno', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            auth_middleware_1.AuthMiddleware.verificarRol(data_1.UserRolDB.ADMIN)
        ], controller.createAlumno);
        router.put('/alumno/:id', [
            auth_middleware_1.AuthMiddleware.validateUserJwt
        ], controller.updateAlumno);
        router.get('/tutor', controller.getTutores);
        router.post('/tutor', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            auth_middleware_1.AuthMiddleware.verificarRol(data_1.UserRolDB.ADMIN)
        ], controller.createTutor);
        router.put('/tutor/:id', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            auth_middleware_1.AuthMiddleware.verificarRol(data_1.UserRolDB.TUTOR, data_1.UserRolDB.ADMIN)
        ], controller.updateTutor);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
