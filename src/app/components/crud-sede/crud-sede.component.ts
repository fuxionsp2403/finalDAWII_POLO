import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from 'src/app/models/pais.model';
import { SedeService } from 'src/app/services/sede.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  formsRegistra= new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaDireccion : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaCodigoPostal: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')])
  });
  
  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaFechaCreacion: new FormControl('', [Validators.min(1)]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaCodigoPostal: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')])
  });
  
    sede: Sede = {};
  
    idPais: number = 0;
    nombre: string = "";
    direccion: string = "";
    estado: boolean = true;
    fechaCreacion: string = "";
    codigoPostal: string = "";
    pais!: Pais[];
    filtro: string ="";
    sedes: Sede[] = [];
    fecha!:String;
    date!:Date;
  
  
    
  
    //para verificar que e pulsó el boton
    submitted = false;
  
    constructor(private sedeService: SedeService,
      private paisService: PaisService) {
    }
  
    ngOnInit(): void {
      this.paisService.listaPais().subscribe(x => {
        this.pais = x
      })
      this.date=new Date()
      this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    }
   
    buscaSede() {
      this.sedeService.listaSedeFiltro(this.filtro, this.direccion,this.estado ? 1 : 0, this.fechaCreacion, this.codigoPostal,
        this.idPais).subscribe(
          (x) => {
            this.sedes = x.lista;
          }
        )
      document.getElementById("btn_filtros_cerrar")?.click();
    }
    actualizaEstado(aux : Sede){
      aux.estado = aux.estado == 0? 1 :0;
      this.sedeService.actualizaSede(aux).subscribe();
  }
  
  
    
    registro() {
     
      this.submitted = true;
  
          
          if (this.formsRegistra.invalid){
            console.log('///:' + this.formsRegistra.getRawValue)
           return;
          }
          
      this.submitted = false;
  
      this.sede.estado = 1;
      this.sede.pais = new Pais(this.idPais)
      this.sedeService.saveSede(this.sede).subscribe(
        (x) => {
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.sedeService.listaSede().subscribe(
            (x) => this.sedes = x
          );
  
        }, error => {
          alert(error);
        }
      )
  
      
      this.sede = {
        idSede: 0,
        direccion: "",
        fechaCreacion: new Date(),
        fechaRegistro: new Date(),
        codigoPostal: "",
        pais: {
          idPais: -1,
          iso: "",
          nombre: ""
        }
      }
      document.getElementById("btn_reg_cerrar")?.click();
      
    }
  
    
    actualizar() {
      this.submitted = true;
  
      
      if (this.formsActualiza.invalid) {
        return;
      }
  
      this.submitted = false;
      this.sedeService.actualizaSede(this.sede).subscribe(
        (x) => {
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.sedeService.listaSede().subscribe(
            (x) => this.sedes = x
          );
        }
      );
  
  
      
      this.sede = {
        idSede: 0,
        direccion: "",
        fechaCreacion: new Date(),
        fechaRegistro: new Date(),
        codigoPostal: "",
        pais: {
          idPais: -1,
          iso: "",
          nombre: ""
        }
      }
      
      document.getElementById("btn_act_cerrar")?.click();
    }
  
    
    eliminar(aux: Sede) {
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
          this.sedeService.eliminaSede(aux.idSede).subscribe(
            (x) => {
              Swal.fire('Mensaje', x.mensaje, 'success');
              this.sedeService.listaSede().subscribe(
                (x) => this.sedes = x
              );
  
            }
          );
        }
      })
    }
  
  
  
  }
  