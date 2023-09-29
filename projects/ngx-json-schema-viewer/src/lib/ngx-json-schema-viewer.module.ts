import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxJsonSchemaViewerComponent } from './ngx-json-schema-viewer.component';

import {
  CreateNodesComponent
} from "./common/index"

import {
  ErrorOccurredLabelComponent,
  LoadingLabelComponent
} from "./labels/index";

@NgModule({
  declarations: [
    NgxJsonSchemaViewerComponent
  ],
  imports: [
    ErrorOccurredLabelComponent,
    LoadingLabelComponent,
    CreateNodesComponent,
    MatExpansionModule
  ],
  exports: [
    NgxJsonSchemaViewerComponent
  ]
})
export class NgxJsonSchemaViewerModule { }
