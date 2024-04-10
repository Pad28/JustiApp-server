"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const envs_1 = require("./envs");
const emailTemplate = (token) => `
<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Registro en JustiApp</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Gabarito&family=Josefin+Sans:wght@300&family=Staatliches&display=swap"
        rel="stylesheet">
</head>
<body>
    <table align="center" width="600" cellpadding="0" cellspacing="0">
        <tr>
            <td bgcolor=" #63000A" align="center" style="padding: 40px 0;"></td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 30px; height: 300px;" >
                <h2 style="font-family: 'Gabarito';">¡Ya falta poco!</h2>
                <p style="font-family: 'Gabarito';" >Entra al siguente enlace para completar tu proceso de de registro a JustiApp</p>
                <br>
                <a  style="font-family: 'Gabarito';" href="http://${envs_1.envs.API_SERVICE}/register/${token}" >Crear cuenta</a>
            </td>
        </tr>
        <tr>
            <td bgcolor=" #63000A" align="center" style="padding: 20px 0;">
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Todos los derechos reservados </h3>
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Padilla Pérez Miguel Angel @_migue_pa</h3>
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Tenorio Miranda Diego de Jesús @diegoocp10</h3>
            </td>
        </tr>
    </table>
</body>
</html>
`;
exports.emailTemplate = emailTemplate;
