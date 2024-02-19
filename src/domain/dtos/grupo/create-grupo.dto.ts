import { Validators } from "../../../config";
import { DireccionGrupoDB } from "../../../data";

export class CreateGrupoDto {
    private constructor(
        public readonly id: string,
        public readonly cuatrimestre: number,
        public readonly direccion: string,
        public readonly tutor: string,
    ) {}

    public static create(obj: {[key:string]: any}): [string?, CreateGrupoDto?] {
        try {
            const validators = new Validators(obj);

            validators.requiredKeys('id', 'cuatrimestre', 'direccion', 'tutor');
            obj.id = (obj.id as string).toUpperCase();

            validators.isNumber('tutor');
            
            validators.isNumber('cuatrimestre');

            obj.direccion = (obj.direccion as string).toUpperCase();
            if(!Object.keys(DireccionGrupoDB).includes(obj.direccion)) throw 'direccion no valida'

            const {id, cuatrimestre, direccion, tutor} = obj;
            return [undefined, new CreateGrupoDto(id, cuatrimestre, direccion, tutor)]
        } catch (error) {
            return [ error as string ];
        }
    }
}