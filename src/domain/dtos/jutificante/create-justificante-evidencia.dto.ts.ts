import { Validators } from "../../../config";

export class CreateJustificanteAndEvidenciaDto {
    constructor(
        public readonly motivo: string, 
        public readonly fecha_creacion: Date, 
        public readonly fecha_justificada_inicio: Date, 
        public readonly fecha_justificada_fin: Date, 
        public readonly id_alumno: string, 
        public readonly id_tutor: string, 
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateJustificanteAndEvidenciaDto?] {
        try {
            const validators = new Validators(object);

            validators.requiredKeys(
                'motivo', 
                'fecha_justificada_inicio',
                'fecha_justificada_fin',
                'id_alumno',
                'id_tutor',
            );
            
            validators.checkPattern('id_alumno', /^[0-9]+$/);
            validators.checkPattern('id_tutor', /^[0-9]+$/);

            object.fecha_creacion = new Date();
            validators.isDate('fecha_creacion');
            validators.isDate('fecha_justificada_inicio');
            validators.isDate('fecha_justificada_fin');
            
            return [undefined, new CreateJustificanteAndEvidenciaDto(
                object.motivo,
                object.fecha_creacion,
                object.fecha_justificada_inicio,
                object.fecha_justificada_fin,
                object.id_alumno,
                object.id_tutor
            )];
        } catch (error) {
            return [error as string];
        }
    }

}