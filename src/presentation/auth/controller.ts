import { Request, Response } from "express";
import { AppController } from "../controller";
import { LoginAlumnoDto, LoginUserDto, RegisterAlumnoDto } from "../../domain";
import { AuthService } from "../services";

export class AuthController extends AppController {
    
    constructor(
        public readonly authService: AuthService,
    ){ super();}
    
    public createAlumno = (req: Request, res: Response) => {
        const { token } = req.params;
        this.authService.createAlumno(token, req.body)
            .then(user => res.json({ user }))
            .catch(error => this.triggerError(error, res));
    }

    public sendVerificationEmail = (req: Request, res: Response) => {
        const { matricula } = req.params;
        
        const [error, registerAlumnoDto] = RegisterAlumnoDto.create({matricula});
        if(error || !registerAlumnoDto) return res.status(400).json({ error });

        this.authService.sendVerificationEmail(registerAlumnoDto)
            .then(result => res.json({ msg: result }))
            .catch(error => this.triggerError(error, res));
    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error || !loginUserDto) return res.status(400).json({ error });

        this.authService.loginUser(loginUserDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));
    }   

    public loginAlumno = (req: Request, res: Response) => {
        const [error, loginAlumnoDto] = LoginAlumnoDto.create(req.body);
        if(error || !loginAlumnoDto) return res.status(400).json({ error });

        this.authService.loginAlumno(loginAlumnoDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));
    }

    public verifyJwt = (req: Request, res: Response) => {
        const token = req.header('Authorization');
        res.json({
            user: req.body.user,
            token: token!.split(' ').at(1),
        });
    }

}