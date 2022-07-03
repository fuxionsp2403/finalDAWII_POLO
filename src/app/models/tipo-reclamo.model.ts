export class TipoReclamo {
    idTipoReclamo?:number;
	descripcion?:string;
    estado?:number;

    constructor(idTipoReclamo:number){
        this.idTipoReclamo=idTipoReclamo;
    }
}
