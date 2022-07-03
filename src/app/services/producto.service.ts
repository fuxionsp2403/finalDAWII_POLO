import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProducto = AppSettings.API_ENDPOINT+ 'producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


  saveProducto(p:Producto):Observable<any> {
    return this.http.post<any>(baseUrlProducto+"/saveProduct",p);
  }
  updateProducto(p:Producto):Observable<any> {
    return this.http.put<any>(baseUrlProducto+"/actualizarProduto",p);
  }
  deleteProducto(id:number):Observable<any> {
    return this.http.delete<any>(baseUrlProducto+"/eliminarProducto?id="+id);
  }
  fillterProducto(nombre:string,fecha:string,marca:number,pais:number,estado:number,stock:number):Observable<Producto[]> {
    return this.http.post<Producto[]>(baseUrlProducto+"/fillterProducto?nombre="+nombre+"&marca="+marca+"&pais="+pais+"&estado="+estado+"&fecha="+fecha+"&stock="+stock,null);
  }
  fillterProductoNombre(nombre:string):Observable<Producto[]> {
    return this.http.post<Producto[]>(baseUrlProducto+"/fillterProductoNombre?nombre="+nombre,null);

  }
}
