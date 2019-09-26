import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { environment } from '../../environments/environment';

import { appMetaReducers, appReducer } from './app.reducer';
import { CustomRouterStateModule} from './custom-router-state.module';
import { <%= classify(name) %>Effects } from './<%= dasherize(name) %>/<%= dasherize(name) %>.effects';

const StoreDevTools = !environment.production ? StoreDevtoolsModule.instrument() : [];
const runtimeChecks = !environment.production  ? {
        strictStateImmutability: true,
        strictActionImmutability: true
      } : {};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers, runtimeChecks }),
    EffectsModule.forRoot([<%= classify(name) %>Effects]),
    CustomRouterStateModule,
    StoreDevTools,
  ],
  declarations: []
})
export class AppStateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppStateModule,
    };
  }

  constructor(
      @Optional()
      @SkipSelf()
          parentModule: AppStateModule
  ) {
    throw new Error('StateModule is already loaded. Import it in the AppModule only');
  }
}

