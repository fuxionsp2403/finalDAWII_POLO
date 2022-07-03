import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  ubigeoDepartamentos: string[] = [];
  ubigeoProvincias: string[] = [];
  ubigeoDistritos: Ubigeo[] = [];

  departamentos:string = "-1";
  provincias:string = "-1";
  distritos:number = -1;

  nombre:string = "";
  apellidos:string = "";
  fechaNacimiento:string = "";
  dni:string = "";
  estado:boolean = true;

  clientes:Cliente[] = [];

  constructor(private ubigeoService:UbigeoService, private clienteService:ClienteService) { 

    ubigeoService.listarDepartamento().subscribe(
      (x) =>  this.ubigeoDepartamentos =x
    )

  }

  consultaCliente(){

    this.clienteService.listFilterClient(this.nombre, this.apellidos, this.fechaNacimiento, this.dni, 
      this.estado?1:0, this.distritos).subscribe(

        (x) => {

          this.clientes = x.lista;
          alert(x.mensaje)

        }
      )
  }

  listaProvincia(){
    this.ubigeoService.listaProvincias(this.departamentos).subscribe(
      (x) => this.ubigeoProvincias = x
    );

    this.provincias = "-1";
    this.ubigeoDistritos = [];
    this.distritos = -1;

  }


  listaDistrito(){
    this.ubigeoService.listaDistritos(this.departamentos, this.provincias).subscribe(
      (x) => this.ubigeoDistritos = x
    );

    this.distritos = -1;
  }

  ngOnInit(): void {
  }

}
