import { Request, Response } from "express";
import { CreateAlumnoDto, CreateTutorDto, UpdateAlumnoDto } from "../../domain";
import { UserService } from "../services";
import { AppController } from "../controller";

export class UserController extends AppController{

    constructor(
        private readonly userService: UserService,
    ) {
        super();
    }

    public createAlumno = (req: Request, res: Response) => {
        const [error, createAlumnoDto] = CreateAlumnoDto.create(req.body);
        if(error || !createAlumnoDto) return res.status(400).json({ error }); 
        
        this.userService.registerAlumno(createAlumnoDto)
            .then(user => res.json({ user }))
            .catch(error => this.triggerError(error, res));
    }

    public updateAlumno = (req: Request, res: Response) => {
        const { id } = req.params;
        const { user } = req.body;
        if(id !== user.matricula) return res.status(401).json({ 
            error: 'No autorizado' 
        }); 

        const [error, updateAlumnoDto] = UpdateAlumnoDto.create({...req.body, matricula: id});
        if(error || !updateAlumnoDto) return res.status(400).json({ error }); 

        this.userService.updateAlumno(updateAlumnoDto)
            .then(user => res.json({ user }))
            .catch(error => this.triggerError(error, res));
    }

    public createTutor = (req: Request, res: Response) => {
        const [ error, createTutorDto ] = CreateTutorDto.create(req.body);
        if(error || !createTutorDto) return res.status(400).json({ error });

        this.userService.createTutor(createTutorDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public updateTutor = (req: Request, res: Response) => {
        const { id } = req.params;
        const{ user } = req.body;
        
        if( id !== user.matricula ) return res.status(401).json({
            error: 'No autorizado'
        })

        const [error, updateTutorDto] = UpdateAlumnoDto.create({...req.body, matricula: id});
        if(error || !updateTutorDto) return res.status(400).json({ error });

        this.userService.updateTutor(updateTutorDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public getTutores = (req: Request, res: Response) => {
        this.userService.getTutores()
            .then(tutores => res.json(tutores))
            .catch(error => this.triggerError(error, res));
    }
}