import { Router } from "express";
import multer from "multer";

import { JustificanteController } from "./controller";
import { ExcelService, FileManagerService, JustificanteService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EmailService } from "../services/email.service";

export class JustificanteRoutes {
    static get routes(): Router {
        const routes = Router();
        const controller = new JustificanteController(
            new JustificanteService(
                new ExcelService(),
                new EmailService(),
                new FileManagerService(),
            )
        );
        const upload = multer({ dest: 'uploads/tmp' });

        routes.post('/', [
            AuthMiddleware.validateUserJwt
        ], controller.createJustificante);

        routes.post('/enviar-evidencia', [
            AuthMiddleware.validateUserJwt,
            upload.single('evidencia_img'),
        ], controller.enviarEvidenciaAndJustificante)

        return routes;
    }
}