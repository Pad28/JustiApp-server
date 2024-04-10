"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const controller_1 = require("../controller");
class UploadController extends controller_1.AppController {
    constructor(uploadService) {
        super();
        this.uploadService = uploadService;
        this.subirEvidencia = (req, res) => {
            const { id } = req.params;
            if (!req.file)
                return res.status(400).json({ error: 'No hay archivos que subir' });
            this.uploadService.uploadFile(id, req.file)
                .then(result => res.json({ msg: result }))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.UploadController = UploadController;
