import { Request, Response } from "express";
import { UploadService } from "../services";
import { AppController } from "../controller";

export class UploadController extends AppController{

    constructor(
        private readonly uploadService: UploadService
    ) {
        super()
    }

    public subirEvidencia = (req: Request, res: Response) => {
        const { id } = req.params; 
        if(!req.file) return res.status(400).json({ error: 'No hay archivos que subir' })
        this.uploadService.uploadFile(id, req.file)
            .then(result => res.json({msg: result}))
            .catch(error => this.triggerError(error, res));
    }

}