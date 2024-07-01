"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionsController = void 0;
const controller_1 = require("../controller");
class VersionsController extends controller_1.AppController {
    constructor(versionsService) {
        super();
        this.versionsService = versionsService;
    }
}
exports.VersionsController = VersionsController;
