import { Component, OnInit, enableProdMode } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { ProductoService } from '../../services/producto.service';
import { MarcaService } from '../../services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { Producto } from '../../models/producto.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


declare var $: any;

$(document).ready(function () {
  $.noConflict();
});
@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css'],
})
export class CrudProductoComponent implements OnInit {
  p = new Producto();
  marca!: Marca[];
  pais!: Pais[];
  nombre: string = '';
  result: boolean = true;
  producto = Array();
  color = 'btn-primary';
  idPais: number = 0;
  titulo = 'Nuevo Producto';
  idMarca: number = 0;
  fecha!: String;
  date!: Date;
  registroOne = 0;

  nombreInput = false;
  durabilidadInput = false;
  serieInput = false;
  precioInput = false;
  stockInput = false;
  marcaInput = false;
  paisInput = false;
  fechaVigenciaInput = false;

  validar(): boolean {
    if (this.p.nombre.trim().length < 4 || this.p.nombre.trim().length > 50) {
      return (this.nombreInput = true);
    } else {
      this.nombreInput = false;
    }
    if (this.p.serie.trim().length < 4 || this.p.serie.trim().length > 50) {
      return (this.serieInput = true);
    } else {
      this.serieInput = false;
    }

    if (
      this.p.durabilidad.trim().length < 4 ||
      this.p.durabilidad.trim().length > 50
    ) {
      return (this.durabilidadInput = true);
    } else {
      this.durabilidadInput = false;
    }
    if (this.p.fechaVigencia.trim().length < 4 || this.p.fechaVigencia == '') {
      return (this.fechaVigenciaInput = true);
    } else {
      this.fechaVigenciaInput = false;
    }
    if (this.p.stock < 1 || this.p.stock > 9999) {
      return (this.stockInput = true);
    } else {
      this.stockInput = false;
    }
    if (this.p.precio < 1 || this.p.precio > 9999) {
      return (this.precioInput = true);
    } else {
      this.precioInput = false;
    }
    if (this.idMarca == 0) {
      return (this.marcaInput = true);
    } else {
      this.marcaInput = false;
    }
    if (this.idPais == 0) {
      return (this.paisInput = true);
    } else {
      this.paisInput = false;
    }
    return false;
  }

  cerrarModal() {
    //obtengo el button cerrar y con triiger dispara automaticamente el evento click
    $('#cerrar').trigger('click');
  }
  onChange(e: any) {
    this.validar();
  }

  enter(e: any) {
    if (e.keyCode == 13) {
      this.filterButton();
    }
  }

  constructor(
    private ProductoService: ProductoService,
    private marcaService: MarcaService,
    private paisService: PaisService
  ) {}

  //carga la dala de narca y pais al iniciar la web para rellenar el combo
  ngOnInit(): void {
    this.marcaService.listaMarca().subscribe((x) => {
      this.marca = x;
    });
    this.paisService.listaPais().subscribe((x) => {
      this.pais = x;
    });
  }

  filterButton() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        this.filter();
      },
    });
    this.ProductoService.fillterProductoNombre(this.nombre).subscribe((x) => {
      Toast.fire({
        icon: 'info',
        title: 'Se encontro ' + x.length + ' datos',
      });
    });
  }

  //button filtra la operacion
  filter() {
    this.ProductoService.fillterProductoNombre(this.nombre).subscribe((x) => {
      this.producto = Array();
      if (x.length > 0) {
        this.result = false;
      } else {
        this.result = true;
        this.nombre = '';
      }
      this.registroOne = x[x.length - 1].idProducto;
      console.log(x);
      Array.prototype.forEach.call(x, (value) => {
        var p = value;
        p.marcaAux = value.marca?.nombre;
        p.paisAux = value.pais?.nombre;
        this.producto.push(p);
      });
      this.producto.reverse();
    });
  }
  actualizaEstado(p: Producto) {
    this.nombreInput = false;
    this.durabilidadInput = false;
    this.serieInput = false;
    this.precioInput = false;
    this.stockInput = false;
    this.marcaInput = false;
    this.paisInput = false;
    this.fechaVigenciaInput = false;
    p.estado = p.estado == 0 ? 1 : 0;
    console.log(p);
    this.ProductoService.updateProducto(p).subscribe((resultado) => {
      console.log(resultado);
    });
  }
  consultarProducto(id: number) {
    this.titulo = 'Actualizar Producto';
    Array.prototype.forEach.call(this.producto, (value) => {
      if (value.idProducto == id) {
        this.p = value;
        this.fecha = value.fechaRegistro.split(' ')[0];
        console.log(this.fecha);
        this.idMarca = value.marca.idMarca;
        this.idPais = value.pais.idPais;
      }
    });
  }

  nuevoRegistro() {
    this.titulo = 'Nuevo Producto';
    this.p = new Producto();
    this.idMarca = 0;
    this.idPais = 0;
    this.date = new Date();
    this.fecha =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.nombreInput = false;
    this.durabilidadInput = false;
    this.serieInput = false;
    this.precioInput = false;
    this.stockInput = false;
    this.marcaInput = false;
    this.paisInput = false;
    this.fechaVigenciaInput = false;
  }

  guardar() {
    if (this.validar()) {
      return;
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Swal.fire({
      title: '¿Deseas Guardar?',
      text: '¡Se guardar los campos ingresados!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.p.pais = new Pais(this.idPais);
        this.p.marca = new Marca(this.idMarca);
        if (this.p.idProducto <= 0) {
          this.date = new Date();
          this.p.fechaRegistro =
            this.fecha +
            ' ' +
            this.date.getHours() +
            ':' +
            this.date.getMinutes() +
            ':' +
            this.date.getSeconds();
          this.ProductoService.saveProducto(this.p).subscribe((x) => {
            Toast.fire({
              icon: 'success',
              title: x.mensaje,
            }).then((result) => {
              this.filter();
            });
          });
        } else {
          this.ProductoService.updateProducto(this.p).subscribe((resultado) => {
            Toast.fire({
              icon: 'success',
              title: resultado.mensaje,
            }).then((result) => {
              this.filter();
            });
          });
        }
        this.cerrarModal();
      
      }
    });
  }
  eliminar(id: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Swal.fire({
      title: '¿Estás Seguro?',
      text: '¡No se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductoService.deleteProducto(id).subscribe((resultado) => {
          Toast.fire({
            icon: 'success',
            title: resultado.mensaje,
          }).then((result) => {
            this.filter();
          });
        });
      }
    });
  }
  //hover del button filtrar para cambiar de color cuando pase por encima
  hover() {
    if (this.color == 'btn-primary') {
      this.color = 'btn-info';
    } else {
      this.color = 'btn-primary';
    }
  }
}
