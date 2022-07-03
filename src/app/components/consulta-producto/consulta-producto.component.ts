import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { Marca } from '../../models/marca.model';
import { ProductoService } from '../../services/producto.service';
import { PaisService } from '../../services/pais.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {

  marca!:Marca[];
  pais!:Pais[];
  idPais:number=-1;
  idMarca:number=-1;
  nombre:string="";
  fecha:string="null";
  estado:boolean=true;
  stock:string="";
  result:boolean=true;
  producto=Array();
  color="btn-primary"
  constructor(private ProductoService: ProductoService
    ,private marcaService: MarcaService,
    private paisService:PaisService) { }

    //carga la dala de narca y pais al iniciar la web para rellenar el combo
  ngOnInit(): void {
    this.marcaService.listaMarca().subscribe(x => {
      this.marca=x
    })
    this.paisService.listaPais().subscribe(x => {
      this.pais=x
    })
  }

  //button filtra la operacion
  filter(){
    //estado valido si this.estado == true en la variable est = 1 caso contrario est = 0
    let est=0
    if(this.estado){
      est=1
    }else{
      est=0
    }
    //stock vaido incial valor=-1
    var valor=-1
    //valido si el stock == null valor = -1  caso contrario se almacena el stock  al valor
    if(this.stock == null || this.stock==""){
    valor = -1
    }else{
      valor=  parseInt(this.stock) 
    }
    //llamar al servidor pasdando lo respectivo parametro
 this.ProductoService.fillterProducto(this.nombre,this.fecha,this.idMarca,this.idPais,est,valor).subscribe(x => {
 this.producto=Array();
 //muestro el alert con el tamaño de la lista
 alert("Existe "+x.length+" datos para mostrar")


 //valida el resultado para mostra el alert de boostrar o no
 if(x.length>0){
  this.result=false
 }else{
   this.result=true;

  
  this.idPais=-1;
  this.idMarca=-1;
  this.nombre="";
  this.fecha="null";
  this.estado=true;
  this.stock="";
 }
 //agregao la  lista x producto y seteando nombre de la marca y el nombre del pais al lista producto global
  for(let n = 0; n <= x.length; n++){
    var p= x[n]
    p.marcaAux=x[n].marca?.nombre
    p.paisAux=x[n].pais?.nombre
    this.producto.push(p);  
    }

  
 }) 
  }

//hover del button filtrar para cambiar de color cuando pase por encima
  hover(){
    if(this.color=="btn-primary"){
 this.color="btn-success"
    }else{
     this.color="btn-primary"
    }
  }
}
