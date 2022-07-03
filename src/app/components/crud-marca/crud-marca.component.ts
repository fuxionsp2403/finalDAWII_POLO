import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {


  marca: Marca = {};

  marca_reg:Marca = {};

  idMarca:number = 0;

  idPais1: number = 0;
  
  nombre: string = "";
  descripcion: string = "";
  fechaVigencia: string = "";
  estado: boolean = true;
  pais!: Pais[];
  filtro: string ="";
  marcas: Marca[] = [];
  fecha!:String;
  date!:Date;

  marca_act: Marca = {
    pais: {
      idPais: -1,
      iso: "",
      nombre: ""
    }
  };


  

  //para verificar que e pulsó el boton
  submitted = false;

  constructor(private marcaService: MarcaService,
    private paisService: PaisService) {
  }

  ngOnInit(): void {
    this.paisService.listaPais().subscribe(x => {
      this.pais = x
    })
    this.date=new Date()
    this.descripcion = "";
    this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
  }
  // Buscar
  buscarMarca(obt:Marca) {
    let id = obt.idMarca
    this.marcaService.buscaMarca(id!).subscribe(
        (x) =>{
          this.marca = x.datos;
          this.marca_act.pais = this.marca.pais;
          /*
          let marcaPais = this.marca.pais?.idPais;
          this.idPais != marcaPais;
          console.log(this.marca.pais?.idPais +  ' -- ' + this.idPais) */
        }
      )
    document.getElementById("btn_filtros_cerrar")?.click();
  }
  //
  FiltrarConParametros(){
    this.marcaService.listaMarcaNombre(this.filtro).subscribe(
        (x) => {
          this.marcas = x.lista;
        }
      )
      
  }
  //
  actualizaEstado(aux : Marca){
    aux.estado = aux.estado == 0? 1 :0;
    console.log(aux.estado);
    this.marcaService.updateMarca(aux).subscribe(
      (x) => {
        if(x.valida == "OK"){
          Swal.fire('Mensaje', 'Estado ha sido actualizado.', 'success');
        }else{
          Swal.fire('Mensaje', 'Estado no ha sido actualizado.', 'error');
        }
        this.marcaService.listaMarca().subscribe(
          (x) => this.marcas = x
        );
      }, error => {Swal.fire('Mensaje', error, 'error');
      }
    );
}

//Limpiar
limpiar(){
  this.idPais1= 0;
  this.marca = {
    idMarca: 0,
    descripcion: "",
    certificado: "",
    fechaVigencia: new Date(),
    fechaRegistro: new Date(),
    pais: {
      idPais: -1,
      iso: "",
      nombre: ""
    }
  }
}
  // Registrar Marca
  registro() {
    /*****************/

    this.marca_reg.estado = 1;
    this.marca_reg.pais = new Pais(this.idPais1)
    //
    if(this.marca_reg.nombre == null || this.marca_reg.nombre.trim()==""){
        Swal.fire('Mensaje', 'Ingrese el nombre de la Marca.', 'error')
        return ;
    }
    if(this.marca_reg.descripcion == null || this.marca_reg.descripcion.trim()==""){
      Swal.fire('Mensaje', 'Ingrese la descripción de la Marca.', 'error')
      return ;
    }
    if(this.marca_reg.certificado== null || this.marca_reg.certificado.trim()==""){
      Swal.fire('Mensaje', 'Ingrese el certificado de la Marca.', 'error')
      return ;
    }
    if(this.marca_reg.fechaVigencia == null || this.marca_reg.fechaVigencia <= this.date){
      Swal.fire('Mensaje', 'Fecha de Vigencia debe ser mayor a la fecha actual.', 'error')
      return ;
    }
    if(this.marca_reg.pais == "0" || this.marca_reg.pais <= 0){
      Swal.fire('Mensaje', 'Ingrese un país valido.', 'error')
      return ;
    }
    //
    this.marcaService.saveMarca(this.marca_reg).subscribe(
      (x) => {
        if(x.valida == "OK"){
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.limpiar();
        }else{
          Swal.fire('Mensaje', x.mensaje, 'error');
          this.limpiar();
        }
        this.marcaService.listaMarca().subscribe(
          (x) => this.marcas = x
        );

      }, error => {Swal.fire('Mensaje', error, 'error');
      }
    )

    //limpiar los componentes del formulario a través de los ngModel
    this.marca_reg = {
      idMarca: 0,
      descripcion: "",
      certificado: "",
      fechaVigencia: new Date(),
      fechaRegistro: new Date(),
      pais: {
        idPais: -1,
        iso: "",
        nombre: ""
      }
    }
    
    this.limpiar();
    document.getElementById("btn_reg_cerrar")?.click();
    /***********************/
  }

  // Actualizar Marca
  actualizar() {
    let pais = this.marca.pais
    
    this.marca.pais = this.marca_act.pais;
    
    if(this.marca.estado == 0 ){
      this.marca.pais = pais;
      Swal.fire('Mensaje', 'Marca no puede actualizarse porque su estado está inhabilitado.', 'error')
      this.limpiar();
      document.getElementById("btn_act_cerrar")?.click();
      return ;
    }
    if(this.marca.nombre == null || this.marca.nombre.trim()==""){
      this.marca.pais = pais;
        Swal.fire('Mensaje', 'Ingrese el nombre de la Marca.', 'error')
        return ;
    }
    if(this.marca.descripcion == null || this.marca.descripcion.trim()==""){
      this.marca.pais = pais;
      Swal.fire('Mensaje', 'Ingrese la descripción de la Marca.', 'error')
      return ;
    }
    if(this.marca.certificado== null || this.marca.certificado.trim()==""){
      this.marca.pais = pais;
      Swal.fire('Mensaje', 'Ingrese el certificado de la Marca.', 'error')
      return ;
    }
    if(this.marca.fechaVigencia == null || this.marca.fechaVigencia <= this.date){
      this.marca.pais = pais;
      Swal.fire('Mensaje', 'Fecha de Vigencia debe ser mayor a la fecha actual.', 'error')
      return ;
    }
    if(this.marca.pais == "0" || this.marca.pais == 0){
      Swal.fire('Mensaje', 'Ingrese un país valido.', 'error')
      return ;
    }
    //
    
    this.marcaService.updateMarca(this.marca).subscribe(
      (x) => {
        if(x.valida == "OK"){
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.limpiar();
        }else{
          Swal.fire('Mensaje', x.mensaje, 'error');
          this.limpiar();
        }
        this.marcaService.listaMarca().subscribe(
          (x) => this.marcas = x
        );
      }, error => {Swal.fire('Mensaje', error, 'error');
      }
    );
    //limpiar los componentes del formulario a través de los ngModel

    this.limpiar();
    /*********/
    document.getElementById("btn_act_cerrar")?.click();
  }

  // Eliminar Marca
  eliminar(aux: Marca) {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¡No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Elimínalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.deleteMarca(aux.idMarca).subscribe(
          (x) => {
            if(x.valida == "OK"){
              Swal.fire('Mensaje', x.mensaje, 'success');
            }else{
              Swal.fire('Mensaje', x.mensaje, 'error');
            }
            this.marcaService.listaMarca().subscribe(
              (x) => this.marcas = x
            );

          }
        );
      }
    })
  }



}
