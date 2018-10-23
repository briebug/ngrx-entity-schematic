import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/entities',
    pathMatch: 'full'
  },
  {
    path: 'entities',
    loadChildren: 'src/app/entities/entities.module#EntitiesModule'
  },
  {
    path: '**',
    redirectTo: '/entities',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
