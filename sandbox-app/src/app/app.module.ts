import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CoreModule } from './core/core.module';
import { InMemoryDataService } from './core/in-memory-data.service';
import { AppStateModule } from './state/app-state.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 }),
    AppStateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
