/*
 * TODO:
 * This file should not remain in the state folder. Move it to somewhere within
 * your app code.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {
  BASE_URL = 'api/';

  constructor(private httpClient: HttpClient) {}

  create(<%= name %>: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.httpClient.post<<%= classify(name) %>>(`${this.BASE_URL}<%= name %>`, {
      ...<%= name %>,
      // We clear out the ID to indicate that this should be a new entry:
      id: null
    });
  }

  search(): Observable<Array<<%= classify(name) %>>> {
    // TODO: get based on state.paging (filter, sorting, page, limit)
    return this.httpClient.get<Array<<%= classify(name) %>>>(`${this.BASE_URL}<%= name %>`);
  }

  getById(id: number): Observable<<%= classify(name) %>> {
    return this.httpClient.get<<%= classify(name) %>>(`${this.BASE_URL}<%= name %>/${id}`);
  }

  update(<%= name %>: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.httpClient
      .put<<%= classify(name) %>>(`${this.BASE_URL}<%= name %>/${<%= name %>.id}`, <%= name %>)
      // The following pipe can be removed if your backend service returns the
      // edited value:
      .pipe(switchMap(() => of(<%= name %>)));
  }

  deleteById(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.BASE_URL}<%= name %>/${id}`)
      // The following pipe can be removed if your backend service returns the
      // ID or body of the deleted entity:
      .pipe(switchMap(() => of(id)));
  }
}
