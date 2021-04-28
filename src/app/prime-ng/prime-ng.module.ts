import { NgModule } from '@angular/core';

// Componentes UI
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  exports: [
    MenubarModule,
    ButtonModule,
    RippleModule,
    TableModule,
    CardModule,
    FieldsetModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    MessagesModule
  ]
})
export class PrimeNgModule { }
