import path from "path";
import { AppController } from "../controller";
import { EmailService, FileManagerService, VersionsService } from "../services";
import { CustomError } from "../../domain";

export class VersionsController extends AppController {

    constructor(
        private versionsService: VersionsService,
    ) { super(); }
    

    

}