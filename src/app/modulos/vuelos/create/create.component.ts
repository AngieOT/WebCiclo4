import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VueloModel } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router) { }

  fgValidacion = this.fb.group({
   fecha_inicio: ['', [Validators.required]],
   hora_inicio: ['', [Validators.required]],
   fecha_fin: ['', [Validators.required]],
   hora_fin: ['', [Validators.required]],
   asientos_vendidos: ['', [Validators.required]],
   nombre_piloto: ['', [Validators.required]],
   ruta: ['', [Validators.required]],
  });
  
  ngOnInit(): void {
  }

  store(){
    let vuelo = new VueloModel();
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value as string;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value as string;
 
    this.vueloService.store(vuelo).subscribe((data: VueloModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
