import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityComponent } from './containers/entity/entity.component';
import { EntityListComponent } from './containers/entity-list/entity-list.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [EntityListComponent, EntityComponent, EntityFormComponent]
})
export class EntitiesModule {}
