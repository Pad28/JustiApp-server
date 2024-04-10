"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class EmailService {
    enviarArchivo(props) {
        const { destinatario, pathFile, subject } = props;
        const trasnporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: config_1.envs.GMAIL_DIRECCION,
                pass: config_1.envs.GMAIL_KEY
            }
        });
        const mailOptions = {
            from: config_1.envs.GMAIL_DIRECCION,
            to: destinatario,
            subject: subject,
            attachments: [
                {
                    filename: `Justificante`,
                    content: fs_1.default.createReadStream(path_1.default.resolve(pathFile))
                }
            ]
        };
        trasnporter.sendMail(mailOptions, (err) => {
            if (err)
                return domain_1.CustomError.internalServerError();
        });
    }
    enviarCorreo(props) {
        const { destinatario, html, subject } = props;
        const trasnporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: config_1.envs.GMAIL_DIRECCION,
                pass: config_1.envs.GMAIL_KEY
            }
        });
        const mailOptions = {
            from: config_1.envs.GMAIL_DIRECCION,
            to: destinatario,
            subject: subject,
            html
        };
        trasnporter.sendMail(mailOptions, (err) => {
            if (err)
                return domain_1.CustomError.internalServerError();
        });
    }
}
exports.EmailService = EmailService;
