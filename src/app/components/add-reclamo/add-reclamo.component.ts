import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-add-reclamo',
  templateUrl: './add-reclamo.component.html',
  styleUrls: ['./add-reclamo.component.css']
})
export class AddReclamoComponent implements OnInit {

   tipo_reclamo: TipoReclamo[] = [];
   cliente: Cliente[] = [];
   reclamo: Reclamo = {}
  constructor(private tipo_reclamoservice: TipoReclamoService, private clienteservice: ClienteService, private reclamoService:ReclamoService) {
    this.tipo_reclamoservice.listaTipoReclamo().subscribe(
      (x) => this.tipo_reclamo = x
    );
    this.clienteservice.listaCliente().subscribe(
      (c) => this.cliente = c
    );
   }
    
   insertado(){
      this.reclamoService.insertaReclamo(this.reclamo).subscribe(
        response => {
          alert(response.mensaje);
        }, error =>{
          alert(error);
        }
      );
   }
    
  
  ngOnInit(): void {
  }

}
