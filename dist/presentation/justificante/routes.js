"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustificanteRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("./controller");
const services_1 = require("../services");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const email_service_1 = require("../services/email.service");
class JustificanteRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const controller = new controller_1.JustificanteController(new services_1.JustificanteService(new services_1.ExcelService(), new email_service_1.EmailService(), new services_1.FileManagerService()));
        const upload = (0, multer_1.default)({ dest: 'uploads/tmp' });
        routes.post('/', [
            auth_middleware_1.AuthMiddleware.validateUserJwt
        ], controller.createJustificante);
        routes.post('/enviar-evidencia', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            upload.single('evidencia_img'),
        ], controller.enviarEvidenciaAndJustificante);
        return routes;
    }
}
exports.JustificanteRoutes = JustificanteRoutes;
