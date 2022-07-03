import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'Sistema de DAWII - Jacinto';

  logeado=false;

  salir(){
    Swal.fire({
      title: '¿Estás Seguro?',
      text: '¡Te saldras del panel admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["login"]);
      this.logeado=false;
      }
    });

  
  }
  constructor(http: HttpClient,private router:Router ){
    this.logeado=window.sessionStorage.getItem("logeado") == "true"
    console.log(this.logeado)

      this.repeat();
  }   
   repeat(){
    setTimeout(()=>{
      this.logeado=window.sessionStorage.getItem("logeado") == "true"
      console.log(this.logeado)  
      this.repeat();
    }, 100);
  }
}
