export * from './src/autosize.directive';

import { NgModule } from '@angular/core';
import { ngAutosizeDirective } from './src/autosize.directive';

@NgModule({
  declarations: [ngAutosizeDirective],
  exports: [ngAutosizeDirective],
})
export class ngAutoSizeModule { }
