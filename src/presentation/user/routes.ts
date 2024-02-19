import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRolDB } from "../../data";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController(
            new UserService()
        );

        router.post('/alumno', [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRolDB.ADMIN)
        ], controller.createAlumno);
 
        router.put('/alumno/:id', [
            AuthMiddleware.validateUserJwt
        ], controller.updateAlumno);
        
        router.get('/tutor', controller.getTutores);
        
        router.post('/tutor', [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRolDB.ADMIN)
        ],controller.createTutor);

        router.put('/tutor/:id', [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRolDB.TUTOR, UserRolDB.ADMIN)
        ],controller.updateTutor)

        return router;
    }
}