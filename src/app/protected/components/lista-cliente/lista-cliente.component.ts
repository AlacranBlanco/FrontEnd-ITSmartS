import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./listStyle.scss']
})
export class ListaClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe((clientes) => this.clientes = clientes);

  

  }

  eliminar(_id: string, i: number){
    Swal.fire({
      title: '¿Desea elmininar al cliente?',
      text: "Esta acción es irreversible",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._clienteService.eliminarClienteById(_id).subscribe();
        this.clientes = this.clientes.filter(cliente => cliente._id !== _id);
      }
    })
    
  }

  
  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.clientes);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "clientes");
  });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_data_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
   

}
