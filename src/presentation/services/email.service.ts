import fs from 'fs';
import path from 'path';

import nodemailer from 'nodemailer';
import { envs } from "../../config";
import { CustomError } from '../../domain';

interface EmailFileProperties {
    destinatario: string;
    subject: string;
    pathFile: string[];
}

interface EmailProperties {
    destinatario: string;
    subject: string;
    html: string;
}

export class EmailService {
    
    public enviarArchivo( props: EmailFileProperties ) {
        const { destinatario, pathFile, subject } = props;

        const trasnporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: envs.GMAIL_DIRECCION,
                pass: envs.GMAIL_KEY
            }
        });
        
        const attachments = pathFile.map((v, i) => {
            if(i == 0) return {
                filename: `Justificante.xlsx`,
                content: fs.createReadStream(path.resolve(pathFile[i])),
            }
            
            const array = pathFile[i].split("/");
            return {
                filename: array[array.length - 1],
                content: fs.createReadStream(path.resolve(pathFile[i])),
            }
        });

        const mailOptions = {
            from: envs.GMAIL_DIRECCION,
            to: destinatario,
            subject: subject,
            attachments
        }

        trasnporter.sendMail(mailOptions, (err) => {
            if(err) return CustomError.internalServerError();
            props.pathFile.forEach(e => fs.unlinkSync(e));
        });
    }

    public enviarCorreo(props: EmailProperties) {
        const { destinatario, html, subject } = props;
        const trasnporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: envs.GMAIL_DIRECCION,
                pass: envs.GMAIL_KEY
            }
        });

        const mailOptions = {
            from: envs.GMAIL_DIRECCION,
            to: destinatario,
            subject: subject,
            html
        }

        trasnporter.sendMail(mailOptions, (err) => {
            if(err) return CustomError.internalServerError();
        });
    }

}