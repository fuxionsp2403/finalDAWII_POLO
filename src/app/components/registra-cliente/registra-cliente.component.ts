import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css'],
})
export class RegistraClienteComponent implements OnInit {
  
  ubigeoDepartamentos: string[] = [];
  ubigeoProvincias: string[] = [];
  ubigeoDistritos: Ubigeo[] = [];

  client: Cliente = {
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    },
  };

  constructor(
    private clienteService: ClienteService,
    private ubigeoService: UbigeoService
  ) {
    this.ubigeoService
      .listarDepartamento()
      .subscribe((departamento) => (this.ubigeoDepartamentos = departamento));
  }

  listaProvincia() {
    this.ubigeoService
      .listaProvincias(
        this.client.ubigeo?.departamento
        )
      .subscribe((provincias) => (this.ubigeoProvincias = provincias));
  }

  listaDistrito() {
    this.ubigeoService
      .listaDistritos(
        this.client.ubigeo?.departamento,
        this.client.ubigeo?.provincia
      )
      .subscribe((distritos) => (this.ubigeoDistritos = distritos));
  }

  saveClientMethod() {
    this.clienteService.saveClient(this.client).subscribe (
      response => {
        alert(response.mensaje)
      }, 
      error => {
        alert(error)
      }
    );
  }

  ngOnInit(): void {}
}
