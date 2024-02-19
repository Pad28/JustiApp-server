import { Router } from "express";
import { GrupoController } from "./controller";
import { GrupoService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRolDB } from "../../data";

export class GrupoRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new GrupoController(
            new GrupoService()
        );

        router.get('/', controller.getGrupos);

        router.post('/', [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRolDB.ADMIN)
        ], controller.createGrupo);

        router.put('/:id', [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRolDB.ADMIN)
        ], controller.updateGrupo);

        return router;
    }
}