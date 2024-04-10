"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const controller = new controller_1.AuthController(new services_1.AuthService(new services_1.EmailService()));
        routes.post('/login', controller.loginUser);
        routes.post('/login/alumno', controller.loginAlumno);
        routes.post('/login/verify-jwt', [
            auth_middleware_1.AuthMiddleware.validateUserJwt
        ], controller.verifyJwt);
        routes.post('/register/:token', controller.createAlumno);
        routes.post('/send-email/:matricula', controller.sendVerificationEmail);
        return routes;
    }
}
exports.AuthRoutes = AuthRoutes;
