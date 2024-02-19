import { JwtAdapter, bcryptjsAdapter } from "../../config";
import { emailTemplate } from "../../config/registro-email.template";
import { prisma } from "../../data/mysql";
import { CreateAlumnoDto, CustomError, LoginAlumnoDto, LoginUserDto, RegisterAlumnoDto } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
    
    constructor(
        private readonly emailService: EmailService
    ) {}

    // Crear alumno una vez se ha recibido el correo de verificacion
    public async createAlumno(token: string, data: {[key: string]: any}) {
        const { user, grupo } = prisma;
        const payload = await JwtAdapter.validateToken<{id: string}>(token);
        if(!payload) throw CustomError.badRequest('Token no valido');

        if(!data.grupo) throw CustomError.badRequest('El grupo es obligatorio');
        const [existUser, existGrupo] = await Promise.all([
            user.findUnique({ where: { matricula: payload.id } }),
            grupo.findUnique({ where: { id: data.grupo } })
        ]);
        if(existUser) throw CustomError.badRequest('Enlace caducado');
        if(!existGrupo) throw CustomError.badRequest('Grupo no valido');

        const [error, createAlumnoDto] = CreateAlumnoDto.create({ ...data, matricula: payload.id })
        if(error || !createAlumnoDto) throw CustomError.badRequest(error!);

        const password = bcryptjsAdapter.hash(createAlumnoDto.password);
        const { password: aux, ...newUser } = await user.create({ data: {
            ...createAlumnoDto, 
            password, 
            direccion: existGrupo.direccion,
            tutor: existGrupo.tutor,
            cuatrimestre: existGrupo.cuatrimestre
        }});

        return newUser;
    }   

    // Enviar correo de verificacion
    public async sendVerificationEmail(registerAlumnoDto: RegisterAlumnoDto) {
        const { user } = prisma;
        const token = await JwtAdapter.generateToken({ id: registerAlumnoDto.matricula });
        if(!token) throw CustomError.internalServerError();

        const userExist = await user.findUnique({ where: { matricula: registerAlumnoDto.matricula } });
        if(userExist) throw CustomError.badRequest('Esta matricula ya fue registrada')

        this.emailService.enviarCorreo({
            destinatario: `${registerAlumnoDto.matricula}@upt.edu.mx`,
            subject: 'Registro JustiApp',
            html: emailTemplate(token as string)
        });        

        return 'Correo de verificacion enviado'
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const { user } = prisma
        const result = await user.findUnique({ where: { correo: loginUserDto.correo } });
        if(!result) throw CustomError.badRequest('Correo o contraseña no valido');

        const isMatching = bcryptjsAdapter.compare(loginUserDto.password, result.password);
        if(!isMatching) throw CustomError.badRequest('Correo o contraseña no valido');
        
        const token = await JwtAdapter.generateToken({ id: result.matricula });
        if(!token) throw CustomError.internalServerError();

        const { password, ...data } = result;
        return {
            user: data,
            token
        }
    }

    public async loginAlumno(loginAlumnoDto: LoginAlumnoDto) {
        const { user } = prisma;
        const result = await user.findUnique({ where: { matricula: loginAlumnoDto.matricula } });
        if(!result) throw CustomError.badRequest('Matricula o contraseña no valido');

        const isMatching = bcryptjsAdapter.compare(loginAlumnoDto.password, result.password);
        if(!isMatching) throw CustomError.badRequest('Matricula o contraseña no valido');
        
        const token = await JwtAdapter.generateToken({ id: result.matricula });
        if(!token) throw CustomError.internalServerError();

        const { password, ...data } = result;
        return {
            user: data,
            token
        }
    }

}