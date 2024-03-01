import { PrismaClient } from "@prisma/client";
import { bcryptjsAdapter, envs } from "../../config";

export const prisma = new PrismaClient();

export const conectionDB = async() => {
    try {
        prisma.$connect();
        console.log('Base de datos online');
        const { USER_ADMIN, PASSWORD_ADMIN } = envs;
        const admin = await prisma.user.findUnique({ where: { correo: USER_ADMIN } });
        if(!admin) {
            await prisma.user.create({ data: {
                correo: USER_ADMIN,
                password: bcryptjsAdapter.hash(PASSWORD_ADMIN),
                apellidos: 'admin',
                direccion: 'INGENIERIA',
                matricula: '999',
                nombre: 'JustiApp',
                rol: 'ADMIN',
            }});
            console.log('Admin creado');
        }
    } catch (error) {
        throw error
    }
}