import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css'],
})
export class CrudClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  filtro: string = '';


  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  distritosFilterQuery: number = -1;

  cliente: Cliente = {
    idCliente: 0,
    nombres: '',
    apellidos: '',
    fechaNacimiento: new Date(""),
    dni: '',
    correo: '',
    //fechaRegistro: new Date(),
    direccion: '',
    estado: 1,
    ubigeo: {
      idUbigeo: -1,
      departamento: '-1',
      provincia: '-1',
      distrito: '-1',
    },
  };

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{3,30}'),
    ]),
    validaApellidos: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{3,30}'),
    ]),
    validaDni: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{8}'),
    ]),
    validaCorreo: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}'),
    ]),
    validaFechaNacimiento: new FormControl('', [
      Validators.required,
      Validators.pattern('/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/')
    ]),
    validaDireccion: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]{3,30}'),
    ]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
  });


  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]{3,30}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}')]),
    validaFechaNacimiento: new FormControl('', [Validators.required, Validators.pattern('/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/')]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  

  submitted = false;

  constructor(
    private clienteService: ClienteService,
    private ubigeoService: UbigeoService
  ) {
    this.ubigeoService
      .listarDepartamento()
      .subscribe((response) => (this.departamentos = response));
  }

  cargaProvincia() {
    this.ubigeoService
      .listaProvincias(this.cliente.ubigeo?.departamento)
      .subscribe((response) => (this.provincias = response));

    this.cliente!.ubigeo!.provincia = '-1';
    this.distritos = [];
    this.cliente!.ubigeo!.idUbigeo = -1;
  }

  cargaDistrito() {
    this.ubigeoService
      .listaDistritos(
        this.cliente.ubigeo?.departamento,
        this.cliente.ubigeo?.provincia
      )
      .subscribe((response) => (this.distritos = response));
    this.cliente!.ubigeo!.idUbigeo = -1;
  }
  ngOnInit(): void {}

  consulta() {
    this.clienteService
      .listClientName(this.filtro =="" ? "todos" : this.filtro)
      .subscribe((x) => (this.clientes = x));
  }

  actualizaEstado(aux: Cliente) {
    aux.estado = aux.estado == 0 ? 1 : 0;
    this.clienteService.updateClient(aux).subscribe();
  }

  registra() {

    console.log('aaaa')

    this.submitted = true;

    console.log('Paso this.submittedww')

/*     if (this.formsRegistra.invalid) {
      return;
    } */

    console.log('Paso this.formsRegistra.invalid')

    this.submitted = false;

    if(this.cliente.nombres == null || this.cliente.nombres.trim()==""){
      Swal.fire('Mensaje', 'Ingrese el nombre del cliente.', 'error')
      return ;
  }

  if(this.cliente.apellidos == null || this.cliente.apellidos.trim()==""){
    Swal.fire('Mensaje', 'Ingrese el apellido del cliente.', 'error')
    return ;
}

if(this.cliente.direccion == null || this.cliente.direccion.trim()==""){
  Swal.fire('Mensaje', 'Ingrese la direccion del cliente.', 'error')
  return ;
}

if(this.cliente.dni == null || this.cliente.dni.trim()==""){
  Swal.fire('Mensaje', 'Ingrese el dni del cliente.', 'error')
  return ;
}

if(this.cliente.correo == null || this.cliente.correo.trim()==""){
  Swal.fire('Mensaje', 'Ingrese el correo del cliente.', 'error')
  return ;
}



    this.clienteService.saveClient(this.cliente).subscribe((x) => {
      document.getElementById('btn_reg_limpiar')?.click();
      document.getElementById('btn_reg_cerrar')?.click();
      Swal.fire('Mensaje', x.mensaje, 'success');
      this.clienteService
        .listClientName(this.filtro == "" ? "todos" : this.filtro)
        .subscribe((x) => (this.clientes = x));
    });

    this.distritos = [];
    this.provincias = [];

    this.cliente = {
      idCliente: 0,
      nombres: '',
      apellidos: '',
      fechaNacimiento: new Date(),
      dni: '',
      correo: '',
      direccion: '',
      estado: 1,
      ubigeo: {
        idUbigeo: -1,
        departamento: '-1',
        provincia: '-1',
        distrito: '-1',
      },
    };
  }

  buscar(aux: Cliente) {
    this.cliente = aux;

    this.ubigeoService
      .listaProvincias(this.cliente.ubigeo?.departamento)
      .subscribe((response) => (this.provincias = response));

    this.ubigeoService
      .listaDistritos(
        this.cliente.ubigeo?.departamento,
        this.cliente.ubigeo?.provincia
      )
      .subscribe((response) => (this.distritos = response));
  }

  actualiza() {

    console.log("actualiza")

    this.submitted = true;

    console.log("paso el primer submitted")

    //finaliza el método si hay un error
/*     if (this.formsActualiza.invalid){
     return;
    } */

    console.log("paso el if")

    this.submitted = false;

    if(this.cliente.nombres == null || this.cliente.nombres.trim()==""){
      Swal.fire('Mensaje', 'Ingrese el nombre del cliente.', 'error')
      return ;
  }

  if(this.cliente.apellidos == null || this.cliente.apellidos.trim()==""){
    Swal.fire('Mensaje', 'Ingrese el apellido del cliente.', 'error')
    return ;
}

if(this.cliente.direccion == null || this.cliente.direccion.trim()==""){
  Swal.fire('Mensaje', 'Ingrese la direccion del cliente.', 'error')
  return ;
}

if(this.cliente.dni == null || this.cliente.dni.trim()==""){
  Swal.fire('Mensaje', 'Ingrese el dni del cliente.', 'error')
  return ;
}

if(this.cliente.correo == null || this.cliente.correo.trim()==""){
  Swal.fire('Mensaje', 'Ingrese el correo del cliente.', 'error')
  return ;
}

    this.clienteService.updateClient(this.cliente).subscribe((x) => {
      document.getElementById('btn_act_cerrar')?.click();
      Swal.fire('Mensaje', x.mensaje, 'success');
      this.clienteService
        .listClientName(this.filtro == '' ? 'todos' : this.filtro)
        .subscribe((x) => (this.clientes = x));
    });

    //limpiar los comobobox
    this.distritos = [];
    this.provincias = [];

    //limpiar los componentes del formulario a través de los ngModel

    this.cliente = {
      idCliente: 0,
      nombres: '',
      apellidos: '',
      fechaNacimiento: new Date(),
      dni: '',
      correo: '',
      fechaRegistro: new Date(),
      direccion: '',
      estado: 1,
      ubigeo: {
        idUbigeo: -1,
        departamento: '-1',
        provincia: '-1',
        distrito: '-1',
      },
    };
  }

  elimina(aux: Cliente) {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: '¡No se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Elimínalo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteClient(aux.idCliente).subscribe((x) => {
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.clienteService
            .listClientName(this.filtro == '' ? 'todos' : this.filtro)
            .subscribe((x) => (this.clientes = x));
        });
      }
    });
  }


}
