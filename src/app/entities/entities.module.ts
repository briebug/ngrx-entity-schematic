import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityListComponent } from './containers/entity-list/entity-list.component';
import { EntityComponent } from './containers/entity/entity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EntityListComponent, EntityComponent]
})
export class EntitiesModule { }
