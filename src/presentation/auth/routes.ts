import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService, EmailService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {
        const routes = Router();
        const controller = new AuthController(
            new AuthService( new EmailService() )
        );

        routes.post('/login', controller.loginUser);
        routes.post('/login/alumno', controller.loginAlumno);

        routes.post('/login/verify-jwt', [
            AuthMiddleware.validateUserJwt
        ], controller.verifyJwt);

        routes.post('/register/:token', controller.createAlumno);
        routes.post('/send-email/:matricula', controller.sendVerificationEmail);

        return routes;
    }

}