"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("./controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const services_1 = require("../services");
class UploadRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const controller = new controller_1.UploadController(new services_1.UploadService(new services_1.FileManagerService));
        const upload = (0, multer_1.default)({ dest: 'uploads/tmp' });
        routes.post('/evidencia/:id', [
            auth_middleware_1.AuthMiddleware.validateUserJwt,
            upload.single('evidencia_img')
        ], controller.subirEvidencia);
        return routes;
    }
}
exports.UploadRoutes = UploadRoutes;
