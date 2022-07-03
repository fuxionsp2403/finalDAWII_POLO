import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/crudreclamo';
const baseUrl = 'http://localhost:8090/url/crudreclamo';
const baseR = 'http://localhost:8090/url/reclamo';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }

  insertaReclamo(data:Reclamo): Observable<any> {
    return this.http.post(baseR + "/insertaReclamo", data)
  }

  listaReclamo(filtro : any): Observable<Reclamo[]>{
    return this.http.get<Reclamo[]>(baseUrl + "/listaReclamoPorDescripcionLike/" + filtro)   
  }

  registraReclamo(aux : Reclamo): Observable<any>{
   return this.http.post(baseUrl + "/registraReclamo", aux);
  }

 actualizaReclamo(aux : Reclamo): Observable<any>{
    return this.http.put(baseUrl + "/actualizaReclamo", aux);
   }

  eliminaReclamo(id : any): Observable<any>{
    return this.http.delete(baseUrl + "/eliminaReclamo/" + id);
   }
}
