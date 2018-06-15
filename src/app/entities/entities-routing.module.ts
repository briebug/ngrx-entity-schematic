import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntitiesModule } from './entities.module';
import { EntityListComponent } from './containers/entity-list/entity-list.component';
import { EntityComponent } from './containers/entity/entity.component';

const routes: Routes = [
  {
    path: '',
    component: EntityListComponent
  },
  {
    path: 'add',
    component: EntityComponent
  },
  {
    path: ':id',
    component: EntityComponent
  }
];

@NgModule({
  imports: [EntitiesModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule {}
