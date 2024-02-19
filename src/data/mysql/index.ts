import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const conectionDB = async() => {
    try {
        prisma.$connect();
        console.log('Base de datos online');
    } catch (error) {
        throw error
    }
}