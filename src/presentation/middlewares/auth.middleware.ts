import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/mysql";

export class AuthMiddleware {
    
    static async validateUserJwt(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({ error: 'No hay token en la peticion' });
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Token Bearer invalido' });
        
        const token = authorization.split(' ').at(1) || '';
        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if(!payload) return res.status(401).json({ error: 'Token no valido' })
            
            const user = await prisma.user.findUnique({ where: { matricula: payload.id } });
            if(!user) return res.status(401).json({ error: 'Token no valido' });
            
            req.body.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static verificarRol(...roles:string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if(!req.body.user) return res.status(401).json({
                error: 'Se requiere verificar el token primero'
            });

            if(!roles.includes(req.body.user.rol)) {
                return res.status(401).json({
                    error: 'No autorizado'
                });
            }
            
            next();
        }
    }
}