import { Router } from "express";
import multer from 'multer';
import { UploadController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileManagerService, UploadService } from "../services";

export class UploadRoutes {
    static get routes(): Router {
        const routes = Router();
        const controller = new UploadController(
            new UploadService( new FileManagerService )
        );
        const upload = multer({ dest: 'uploads/tmp' });

        routes.post('/evidencia/:id', [
            AuthMiddleware.validateUserJwt,
            upload.single('evidencia_img')
        ], controller.subirEvidencia);

        return routes;
    }
}