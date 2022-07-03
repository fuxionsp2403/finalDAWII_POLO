import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { Pais } from 'src/app/models/pais.model';
import { SedeService } from 'src/app/services/sede.service';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

sede: Sede= {};

idPais:number=1;
nombre:string = "";
direccion:string = "";
estado:boolean = true;
fechaCreacion:string = "";
codigoPostal:string = "";
pais!:Pais[];

sedes:Sede[] = [];


  constructor(private paisService:PaisService,
     private sedeService:SedeService) {
    
   }

   ngOnInit(): void {
    this.paisService.listaPais().subscribe(x => {
    this.pais=x
  })
  }

  consultaSede(){
    this.sedeService.listaSedeFiltro(this.nombre,this.direccion,this.estado?1:0,this.fechaCreacion,this.codigoPostal,this.idPais).subscribe(
      (x) => {
        this.sedes = x.lista;
        alert(x.mensaje5)
      }
    )
}

}
