import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { JustificanteRoutes } from "./justificante/routes";
import { UploadRoutes } from "./upload/routes";
import { GrupoRoutes } from "./grupo/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/grupo', GrupoRoutes.routes);
        router.use('/api/justificante', JustificanteRoutes.routes);
        router.use('/api/upload', UploadRoutes.routes);
        router.use('/api/user', UserRoutes.routes);

        return router;
    }
}