import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../interfaces/cliente.interface';
import { switchMap} from 'rxjs/operators'
import { Subscription } from 'rxjs';

declare const H: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styles: [
  ]
})
export class EditarClienteComponent implements OnInit, OnDestroy {

   // Cancelador de suscripciones
   suscripciones: Subscription[] = [];

   cliente!: Cliente;
   urlTemp: any;
   file!: File;
    // formulario reactivo
    miForm: FormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mName: ['', [Validators.required, Validators.minLength(3)]],
      lName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      creation: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      viewportX: [''],
      viewportY: [''],
      image: ['']
    })

  routingServices: any;
  markersAux: any;

  constructor(private _formBuilder: FormBuilder,
              private _clienteService: ClienteService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute) {  }
  
 
  ngOnInit(): void {
      let platform = new H.service.Platform({
        'apikey': 'YhA5xgsmd3zKjwc0-wajWqUaTNXNyIp74swdc6DESQk',
        'appId': 'zJuDEWCknuHO55skIhvr'
      }); 

      // Obtain the default map types from the platform object:
      let defaultLayers = platform.createDefaultLayers();
     

      this.suscripciones.push(this._activatedRouter.params
      .pipe(
        switchMap(({id}) => this._clienteService.getClienteById(id))
      )
      .subscribe((clientes) =>  {
        this.cliente = clientes;
        this.miForm.patchValue({
          name: clientes.name,
          mName: clientes.mName,
          lName: clientes.lName,
          phoneNumber: clientes.phoneNumber,
          email: clientes.email,
          creation: clientes.creation,
          lat: clientes.lat,
          lng: clientes.lng,
          image: clientes.image
        });

            // Instantiate (and display) a map object:
            let map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
              zoom: 20,
              center: { lat: this.cliente.lat, lng: this.cliente.lng }
        });

          // Create the default UI:
          var ui = H.ui.UI.createDefault(map, defaultLayers);
        
          let pos = map.screenToGeo(
            this.cliente.viewportX,
            this.cliente.viewportY
          );

          let marker = new H.map.Marker(pos);
          map.addObject(marker);
          this.markersAux = marker;

          
          const mapEvents = new H.mapevents.MapEvents(map);
          const behavior = new H.mapevents.Behavior(mapEvents);

          this.routingServices = platform.getRoutingService();

          map.addEventListener("tap", (e: any) => {
            this.miForm.controls['viewportX'].setValue(e.currentPointer.viewportX);
            this.miForm.controls['viewportY'].setValue(e.currentPointer.viewportY);
            pos = map.screenToGeo(
              e.currentPointer.viewportX,
              e.currentPointer.viewportY
            );
            
            marker = new H.map.Marker(pos);

            if(this.markersAux)
                map.removeObject(this.markersAux)
                
            map.addObject(marker);
            this.markersAux = marker;

            this.miForm.controls['lat'].setValue(marker.b.lat.toString());
            this.miForm.controls['lng'].setValue(marker.b.lng.toString());

  
          });
        })
      );
    }

    ngOnDestroy(): void {
      this.suscripciones.forEach(sub => sub.unsubscribe());
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
  
    editar(){

      let clienteEditar = this.miForm.value;
      clienteEditar._id = this.cliente._id;
      
      this.suscripciones.push(this._clienteService.editarCliente(clienteEditar)
          .subscribe(res => {
            if(res._id){
              this.miForm.reset();
              Swal.fire({
                title: 'Success',
                text: "Cliente actualizado correctamente",
                icon: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
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
