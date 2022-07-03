import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {


  
  ngOnInit(): void {
  }

}







