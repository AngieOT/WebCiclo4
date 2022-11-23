import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

  fgValidacion = this.fb.group({
   nombre: ['', [Validators.required]],
   ciudad: ['', [Validators.required]],
   pais: ['', [Validators.required]],
   coord_x: ['', [Validators.required, Validators.minLength(4)]],
   coord_y: ['', [Validators.required, Validators.minLength(4)]],
   siglas: ['', [Validators.required, Validators.minLength(3)]],
   tipo: ['', [Validators.required]],
  });
  
  ngOnInit(): void {
  }

  store(){
    let aeropuerto = new AeropuertoModel();
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value as string;
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value as string;
    aeropuerto.coord_x = this.fgValidacion.controls["coord_x"].value as string;
    aeropuerto.coord_y = this.fgValidacion.controls["coord_y"].value as string;
    aeropuerto.siglas = this.fgValidacion.controls["siglas"].value as string;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value as string;
 
    this.aeropuertoService.store(aeropuerto).subscribe((data: AeropuertoModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
