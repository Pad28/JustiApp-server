import { EmailService } from "./email.service";


export class VersionsService {
    constructor(
        private readonly emailService: EmailService,
    ) {}
}