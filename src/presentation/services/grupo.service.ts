import { DireccionGrupo } from "@prisma/client";
import { prisma } from "../../data";
import { CreateGrupoDto, CustomError, UpdateGrupoDto } from "../../domain";

export class GrupoService {

    public async getGrupos() {
        const { grupo } = prisma;

        const [total, results] = await Promise.all([
            grupo.count(),
            grupo.findMany(),
        ]);
        return { total, results };
    }

    public async createGrupo( createGrupoDto: CreateGrupoDto ) {
        const { user, grupo } = prisma;
        const [existGrupo, existTutor] = await Promise.all([
            grupo.findUnique({ where: { id: createGrupoDto.id } }),
            user.findUnique({ where: { matricula: createGrupoDto.tutor } }),
        ]);

        if(existGrupo) throw CustomError.badRequest(`El grupo ${existGrupo.id} ya fue registrado`);
        if(!existTutor || !existTutor.estado) throw CustomError.badRequest('El tutor no es valido');

        const newGroup = await grupo.create({ data: { 
            ...createGrupoDto,
            direccion: createGrupoDto.direccion as DireccionGrupo
        }});
        return newGroup;
    }

    public async updateGrupo(updateGrupoDto: UpdateGrupoDto, id: string) {
        const { user, grupo } = prisma;
        const data = updateGrupoDto.values;
        
        const existGrupo = await grupo.findUnique({ where: { id } });
        if(!existGrupo) throw CustomError.badRequest('id grupo no valido');

        if(data.id) {
            const existId = await grupo.findUnique({ where: { id: data.id } });
            if(existId) throw CustomError.badRequest('id de grupo no valido');
        }

        if(data.tutor) {
            const existTutor = await user.findUnique({ where: { matricula: data.tutor } });
            if(!existTutor) throw CustomError.badRequest('tutor no valido');
            await user.updateMany({ where: { grupo: id }, data: { tutor: data.tutor } });
        }

        const updateGrupo = await grupo.update({
            where: { id },
            data
        });
        return updateGrupo
    }
}