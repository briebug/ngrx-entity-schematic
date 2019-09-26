import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './customer-router-state.serializer';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: [],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]
})
export class CustomRouterStateModule { }

