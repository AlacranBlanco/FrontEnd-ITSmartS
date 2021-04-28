import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


declare const H: any;

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: [
  ]
})
export class NuevoClienteComponent implements OnInit, OnDestroy {

  // Cancelador de suscripciones
  suscripciones: Subscription = new Subscription();

  // formulario reactivo
  miForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    mName: ['', [Validators.required, Validators.minLength(3)]],
    lName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    creation: [`${moment().format('DD/MM/YYYY hh:mm:ss')}`, [Validators.required]],
    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
    viewportX: [''],
    viewportY: [''],
    image: ['']

  })

  routingServices: any;
  markersAux: any;
  urlTemp: any;
  file!: File;

  constructor(private _formBuilder: FormBuilder,
              private _clienteService: ClienteService,
              private _router: Router,
              ) { }
  
  ngOnInit(): void {
      let platform = new H.service.Platform({
        'apikey': 'YhA5xgsmd3zKjwc0-wajWqUaTNXNyIp74swdc6DESQk',
        'appId': 'zJuDEWCknuHO55skIhvr'
      });

      // Obtain the default map types from the platform object:
      let defaultLayers = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      let map = new H.Map(
          document.getElementById('mapContainer'),
          defaultLayers.vector.normal.map,
          {
            zoom: 11,
            center: { lat: 21.1221632406541, lng: -101.67371843574212 }
          });

      // Create the default UI:
      var ui = H.ui.UI.createDefault(map, defaultLayers);

      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
            map.setCenter({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
          });
      }

      const mapEvents = new H.mapevents.MapEvents(map);
      const behavior = new H.mapevents.Behavior(mapEvents);

      this.routingServices = platform.getRoutingService();

      map.addEventListener("tap", (e: any) => {
        this.miForm.controls['viewportX'].setValue(e.currentPointer.viewportX);
        this.miForm.controls['viewportY'].setValue(e.currentPointer.viewportY);
        const pos = map.screenToGeo(
          e.currentPointer.viewportX,
          e.currentPointer.viewportY
        );
        
        const marker = new H.map.Marker(pos);

        if(this.markersAux)
            map.removeObject(this.markersAux)
            
        map.addObject(marker);
        this.markersAux = marker;

        this.miForm.controls['lat'].setValue(marker.b.lat.toString());
        this.miForm.controls['lng'].setValue(marker.b.lng.toString());

       
      })

    }

    ngOnDestroy(): void {
      if(this.suscripciones)
          this.suscripciones.unsubscribe();
    }
  

    upload(event) {

      if (event.target.files.length == 0) {
        return;
     }

     const tipoArchivo = event.target.files[0].type;

     if(tipoArchivo === "image/jpeg" || tipoArchivo === "image/png"){
         this.file = event.target.files[0];
     } else {
          Swal.fire(
            'Error',
            'El tipo de archivo no es válido',
            'error'
          )
          return;
     }

     const reader = new FileReader();
     reader.readAsDataURL(this.file);
     reader.onload = (e) =>{
       this.miForm.controls['image'].setValue(e.target?.result);
       this.urlTemp = e.target?.result;
     }
    
    }

    agregar(){
     this.suscripciones.add(this._clienteService.nuevoCliente(this.miForm.value)
          .subscribe(res => {
            if(res._id){
              this.miForm.reset();
              Swal.fire({
                title: 'Success',
                text: "Cliente registrado correctamente",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'Entendido!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this._router.navigate(['cliente'])
                }
              })
                
            } else {
              Swal.fire(
                'Error',
                `${res}`,
                'error'
              )
            }
        })
    );
    }
}
