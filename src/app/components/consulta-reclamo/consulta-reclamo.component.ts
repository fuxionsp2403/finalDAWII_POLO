import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  //Ng Model
  descripcion:string="";
  selTipoReclamo:number=-1;
  selCliente:number=-1; 
  fechaCompra:string="null";
  estado:boolean = true;

  cliente:Cliente[] =[];
  tiporeclamo:TipoReclamo[] =[];

  //GRILA
  reclamo: Reclamo[] =[];


  constructor(private reclamoService: ReclamoService, private clienteService: ClienteService, private tiporaclamoService: TipoReclamoService) { }

  ngOnInit(): void {
  }

 


}
