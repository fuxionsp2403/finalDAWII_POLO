import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {
  marca: Marca = {};
  
  idPais:number=0;
  nombre:string="";
  descripcion:string="";
  fechaVigencia:string="";
  estado:boolean = true;
  pais!:Pais[];

  marcas:Marca[]=[];

  constructor( private marcaService: MarcaService,
    private paisService:PaisService) { 
    }

  ngOnInit(): void {
    this.paisService.listaPais().subscribe(x => {
    this.pais=x
  })
  }

  consultaMarca(){
    this.marcaService.listadoMarcasParametros(this.nombre, this.descripcion, this.fechaVigencia,
      this.estado?1:0, this.idPais).subscribe(
        (x) => {
          this.marcas = x.lista;
          alert(x.mensaje)

        }
      )
  }


}