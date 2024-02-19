import { Router } from "express";
import { JustificanteController } from "./controller";
import { ExcelService, JustificanteService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EmailService } from "../services/email.service";

export class JustificanteRoutes {
    static get routes(): Router {
        const routes = Router();
        const controller = new JustificanteController(
            new JustificanteService(
                new ExcelService(),
                new EmailService()
            )
        );

        routes.post('/', [
            AuthMiddleware.validateUserJwt
        ], controller.createJustificante);

        return routes;
    }
}