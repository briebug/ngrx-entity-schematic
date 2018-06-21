import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BriebugComponent } from './containers/entity/entity.component';
import { BriebugListComponent } from './containers/entity-list/entity-list.component';
import { BriebugFormComponent } from './components/entity-form/entity-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [BriebugListComponent, BriebugComponent, BriebugFormComponent]
})
export class EntitiesModule {}
