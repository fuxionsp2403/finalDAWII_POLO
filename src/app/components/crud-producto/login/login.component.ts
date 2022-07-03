import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

username: string="";
password: string="";
showSpinner=false
logeado=false
  ngOnInit() {
    window.sessionStorage.setItem("logeado","false") 
     
  }

  login() : void {
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

    this.showSpinner=true;
    if(this.username == 'admin' && this.password == 'admin'){
     this.logeado=true;
      window.sessionStorage.setItem("logeado",this.logeado+"") 
     
     this.router.navigate(["crudProducto"]);
    }else {    this.logeado=false;
   
      Toast.fire({
        icon: 'error',
        title: "Error de credencial",
      });
    }
  }
  

  
}

