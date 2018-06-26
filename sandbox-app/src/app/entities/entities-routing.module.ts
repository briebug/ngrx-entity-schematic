import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntitiesModule } from './entities.module';
import { BriebugListComponent } from './containers/entity-list/entity-list.component';
import { BriebugComponent } from './containers/entity/entity.component';

const routes: Routes = [
  {
    path: '',
    component: BriebugListComponent
  },
  {
    path: 'add',
    component: BriebugComponent
  },
  {
    path: ':id',
    component: BriebugComponent
  }
];

@NgModule({
  imports: [EntitiesModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule {}
