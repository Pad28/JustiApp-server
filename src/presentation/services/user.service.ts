import { DireccionGrupo, UserRol } from "@prisma/client";
import { prisma } from "../../data/mysql";
import { bcryptjsAdapter } from "../../config";

import { 
    CreateAlumnoDto, 
    CreateTutorDto, 
    CustomError, 
    UpdateAlumnoDto, 
    UpdateTutorDto
} from "../../domain";

export class UserService {
    constructor() {}

    public async registerAlumno( registerAlumnoDto: CreateAlumnoDto ) {
        const { user, grupo } = prisma;
        const [ matriculaExist, correoExist, grupoExist ] = await Promise.all([
            user.findFirst({ where: { matricula: registerAlumnoDto.matricula } }),
            user.findFirst({ where: { correo: registerAlumnoDto.correo } }),
            grupo.findFirst({ where: { id: registerAlumnoDto.grupo } }),
        ]);
        
        if(matriculaExist) throw CustomError.badRequest(`La matricula ${matriculaExist.matricula} ya fue registrada`);
        if(correoExist) throw CustomError.badRequest(`El correo ${correoExist.correo} ya fue registrado`);
        if(!grupoExist) throw CustomError.badRequest('El grupo no es valido');
        const password = bcryptjsAdapter.hash(registerAlumnoDto.password);

        const { password: regiserPassword, ...newUser } = await user.create({ data: {
            ...registerAlumnoDto,
            password,
            direccion: grupoExist.direccion,
            cuatrimestre: grupoExist.cuatrimestre,
            tutor: grupoExist.tutor
        }}); 
        return newUser;
    }

    public async updateAlumno(updateAlumnoDto: UpdateAlumnoDto) {
        const { user, grupo } = prisma;
        const {matricula, ...data} = updateAlumnoDto.values;
        
        const existUser = await user.findUnique({ where: { matricula } });
        if(!existUser) throw CustomError.badRequest('matricula no valida'); 

        if(data.tutor) { 
        const existTutor = await user.findFirst({ where: { nombre: data.tutor } });
            if(!existTutor) throw CustomError.badRequest('Tutor no valido');
            data.tutor = existTutor.matricula;
        }
        
        if(data.password) {
            data.password = bcryptjsAdapter.hash(data.password);
        }

        if(data.grupo) {
            const existGrupo = await grupo.findUnique({ where: { id: data.grupo } });
            if(!existGrupo) throw CustomError.badRequest('Grupo no valido');
            data.tutor = existGrupo.tutor;
            data.direccion = existGrupo.direccion;
            data.cuatrimestre = existGrupo.cuatrimestre;
        }

        const { password, ...rest } = await user.update({ 
            where: { matricula },
            data
        });

        return rest;
    }
    
    public async createTutor(createTutorDto: CreateTutorDto) {
        const { user } = prisma;
        const [ matriculaExist, correoExist ] = await Promise.all([
            user.findFirst({ where: { matricula: createTutorDto.matricula } }),
            user.findFirst({ where: { correo: createTutorDto.correo } }),
        ]);

        if(matriculaExist) throw CustomError.badRequest(`La matricula ${matriculaExist.matricula} ya fue registrada`);
        if(correoExist) throw CustomError.badRequest(`El correo ${correoExist.correo} ya fue registrado`);
        
        const password = bcryptjsAdapter.hash(createTutorDto.password);
        const { password: regiserPassword, ...newUser } = await user.create({ 
            data: {
                ...createTutorDto,
                rol: createTutorDto.rol as UserRol,
                password,
                direccion: createTutorDto.direccion as DireccionGrupo
            }
        });

        return newUser;
    }

    public async updateTutor(updateTutorDto: UpdateTutorDto) {
        const { user } = prisma;
        const {matricula, ...data} = updateTutorDto.values;
        
        const existUser = await user.findUnique({ where: { matricula } });
        if(!existUser) throw CustomError.badRequest('matricula no valida'); 

        if(data.password) {
            data.password = bcryptjsAdapter.hash(data.password);
        }

        const { password: userPass, ...rest } = await user.update({
            where: { matricula } ,
            data
        });

        return rest;
    }

    public async getTutores() {
        const { user } = prisma;
        const results = await user.findMany({
            select: { nombre: true, apellidos: true, correo: true, matricula: true }
        }); 
        if(!results) throw CustomError.internalServerError();

        return results;
    }
}