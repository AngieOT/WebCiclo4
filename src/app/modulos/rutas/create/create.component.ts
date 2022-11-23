import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
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
    private rutaService: RutaService,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

   fgValidacion = this.fb.group({
     origen: ['', [Validators.required]],
     destino: ['', [Validators.required]],
     tiempo_estimado: ['', [Validators.required]], 
    });
  
    listadoAeropuertos: AeropuertoModel[] = []
  
  ngOnInit(): void {
    this.getAeropuertos();
  }

  getAeropuertos(){
    this.aeropuertoService.getAll().subscribe((data: AeropuertoModel[]) => {
      this.listadoAeropuertos = data
      console.log(data)
    })
  }

  store(){
    let ruta = new RutaModel();
    ruta.origen = this.fgValidacion.controls["origen"].value as string;
    ruta.destino = this.fgValidacion.controls["destino"].value as string;
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value as string;
    
    this.rutaService.store(ruta).subscribe((data: RutaModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
