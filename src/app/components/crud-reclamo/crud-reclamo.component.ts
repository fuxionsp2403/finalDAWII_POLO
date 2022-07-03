import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {

  //Prueba
  p = new Reclamo();
  
  //registra
  reclamo_reg: Reclamo = {};
  cliente!:Cliente[];
  tipoReclamos!:TipoReclamo[];
  idTipoReclamo:number=0;
  idCliente:number=0;
  fecha_reg!:String;
  date!:Date;


  tipoReclamo: string[] = [];
  //Para la Grilla
  filtro: string ="";
  fecha: string ="";
  reclamos: Reclamo [] = []; 
  clientes:Cliente[] = [];
  tipo_reclamos:TipoReclamo[] = [];
  

  //Json para registrar o actualizar
  reclamo: Reclamo = {
    fechaRegistro:this.date,
    fechaCompra:this.date, 
    tipoReclamo:{
      idTipoReclamo:0,
	    descripcion:"",
      estado:0
    },
    cliente:{
      ubigeo: {
          idUbigeo: -1,
          departamento:"-1",
          provincia:"-1",
          distrito:"-1",
        }
    }
    
  };

  //Declaracion de validaciones
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaTipoReclamo: new FormControl('', [Validators.min(1)]),
    validaCliente: new FormControl('', [Validators.min(1)]),
    validafecha: new FormControl('', [Validators.required, Validators.pattern('/^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/')]),
  });

  submitted = false;

  constructor(private reclamoService: ReclamoService,
              private clienteService:ClienteService,
              private tipoReclamoService: TipoReclamoService) {
                
              }

  //Carga los datos de cliente y tipoReclamo al iniciar la web para rellenar los combobox
  ngOnInit(): void {
    this.tipoReclamoService.listaTipoReclamo().subscribe(x => {
      this.tipoReclamos=x
    });

    this.clienteService.listaCliente().subscribe(x =>{
      this.cliente=x
    });
    this.date=new Date()
    this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    console.log(this.fecha)
  }

  
  consulta(){
    this.reclamoService.listaReclamo(this.filtro==""?"todos": this.filtro).subscribe(
        (x) => this.reclamos = x
    );
  }

  actualizaEstado(aux : Reclamo){
    aux.estado = aux.estado == 0? 1:0;
    this.reclamoService.actualizaReclamo(aux).subscribe();
}

  busca(aux: Reclamo){
    this.reclamo = aux;
  }
  
  actualiza(){
    this.reclamoService.actualizaReclamo(this.reclamo).subscribe(
      (x)=>{
        document.getElementById("btn_act_cerrar")?.click();
        alert(x.mensaje);
        this.reclamoService.listaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.reclamos = x
  );
      }
    ); 
    }

  elimina(aux: Reclamo){
      this.reclamoService.eliminaReclamo(aux.idReclamo).subscribe(
        (x)=>{
          alert(x.mensaje);
          this.reclamoService.listaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.reclamos=x
          );
        }
      ); 
    }

    insertaReclamo(){
    this.reclamo_reg.estado = 1;
    this.reclamo_reg.cliente= new Cliente(this.idCliente)
    this.reclamo_reg.tipoReclamo= new TipoReclamo(this.idTipoReclamo)
    this.reclamoService.insertaReclamo(this.reclamo).subscribe(
     response =>{
     alert(response.mensaje)
     },error => {
     alert(error);
     }
     )
    }
}

