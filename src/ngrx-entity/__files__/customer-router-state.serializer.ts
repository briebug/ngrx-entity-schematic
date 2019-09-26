import {RouterStateSerializer} from '@ngrx/router-store';
import {Params, RouterStateSnapshot} from '@angular/router';

export interface CustomRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

/**
 * NgRx Router Serializer to auto extract url, params, queryParams
 * from the router data (if available)
 *
 * This feature is really good to use it when supporting deeplinking
 * and using ngrx effects.
 *
 *   1) the router serializer grabs the information from the router,
 *   2) the StoreRouterConnectingModule makes that available as a ROUTER_NAVIGATION actions in NgRx.
 *
 * Doing this allows view Components to ignore router events/snapshots. Instead
 * the ngrx `Effects` classes listen for router navigation events and respond to load data, etc.
 *
 * This is super powerful way to have managed state react to routing changes.
 */
export class CustomRouterStateSerializer
    implements RouterStateSerializer<CustomRouterState> {

  serialize(routerState: RouterStateSnapshot): CustomRouterState {
    let childRoute = routerState.root;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = childRoute;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
