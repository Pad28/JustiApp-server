import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateJustificanteAndEvidenciaDto, CreateJustificanteDto } from "../../domain";
import { JustificanteService } from "../services";

export class JustificanteController extends AppController{

    constructor(
        private readonly justificanteService: JustificanteService,
    ) { super(); }

    public createJustificante = (req: Request, res: Response) => {
        const { user } = req.body;
        const [error, createJustificanteDto] = CreateJustificanteDto.create({
            ...req.body, 
            id_alumno: user.matricula
        });
        if(error || !createJustificanteDto) return res.status(400).json({ error });

        this.justificanteService.createJustificante(createJustificanteDto)
            .then(justificante => res.json({ justificante }))
            .catch(error => this.triggerError(error, res));
    }

    public enviarEvidenciaAndJustificante = (req: Request, res: Response) => {
        if(!req.file) return res.status(401).json({ error: 'No hay evidencia que subir' });
        const [error, createJustificanteDto] = CreateJustificanteAndEvidenciaDto.create({
            ...req.body,
        });
        if(error || !createJustificanteDto) return res.status(400).json({ error });
        this.justificanteService.enviarJustificante(createJustificanteDto, req.file)
            .then(justificante => res.json({ justificante }))
            .catch(error => this.triggerError(error, res));
    }
}