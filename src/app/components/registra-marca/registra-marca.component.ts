import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  marca: Marca = {};
  pais!:Pais[];
  idPais:number=0;
  fecha!:String;
  date!:Date;

  constructor( private marcaService: MarcaService,
    private paisService:PaisService) { }

  ngOnInit(): void {
    console.log(this.fecha)
    this.paisService.listaPais().subscribe(x => {
      this.pais=x
    })
    this.date=new Date()
    this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    console.log(this.fecha)
  }

  saveMarca(){
    this.marca.estado = 1;
    this.marca.pais= new Pais(this.idPais)
    this.marcaService.saveMarca(this.marca).subscribe(
      response =>{
        alert(response.mensaje)
      },error => {
        alert(error);
      }
    )
  }

}
