/*
 * TODO:
 * This file should not remain in the state folder. Move it to somewhere within
 * your app code.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Briebug } from './briebug.model';

@Injectable({
  providedIn: 'root'
})
export class BriebugService {
  BASE_URL = 'api/';

  constructor(private httpClient: HttpClient) {}

  create(briebug: Briebug): Observable<Briebug> {
    return this.httpClient.post<Briebug>(`${this.BASE_URL}briebug`, {
      ...briebug,
      // We clear out the ID to indicate that this should be a new entry:
      id: null
    });
  }

  search(): Observable<Array<Briebug>> {
    // TODO: get based on state.paging (filter, sorting, page, limit)
    return this.httpClient.get<Array<Briebug>>(`${this.BASE_URL}briebug`);
  }

  getById(id: number): Observable<Briebug> {
    return this.httpClient.get<Briebug>(`${this.BASE_URL}briebug/${id}`);
  }

  update(briebug: Briebug): Observable<Briebug> {
    return this.httpClient
      .put<Briebug>(`${this.BASE_URL}briebug/${briebug.id}`, briebug)
      // The following pipe can be removed if your backend service returns the
      // edited value:
      .pipe(switchMap(() => of(briebug)));
  }

  deleteById(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.BASE_URL}briebug/${id}`)
      // The following pipe can be removed if your backend service returns the
      // ID or body of the deleted entity:
      .pipe(switchMap(() => of(id)));
  }
}
