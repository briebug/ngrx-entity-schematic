import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BriebugComponent } from './containers/entity/entity.component';
import { BriebugListComponent } from './containers/entity-list/entity-list.component';
import { BriebugFormComponent } from './components/entity-form/entity-form.component';
import { EntitiesRoutingModule } from './entities-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntitiesRoutingModule
  ],
  declarations: [BriebugListComponent, BriebugComponent, BriebugFormComponent]
})
export class EntitiesModule {}
