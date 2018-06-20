import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Entity } from '@state/entity/entity.model';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  BASE_URL = 'api/';

  constructor(private httpClient: HttpClient) {}

  create(entity: Entity): Observable<Entity> {
    return this.httpClient.post<Entity>(`${this.BASE_URL}entities`, {
      ...entity,
      // We clear out ID to indicate that this should be a new entry:
      id: null
    } as Entity);
  }

  search(): Observable<Array<Entity>> {
    // TODO: get based on state.paging (filter, sorting, page, limit)
    return this.httpClient.get<Array<Entity>>(`${this.BASE_URL}entities`);
  }

  getById(id: number): Observable<Entity> {
    return this.httpClient.get<Entity>(`${this.BASE_URL}entities/${id}`);
  }

  update(entity: Entity): Observable<Entity> {
    return this.httpClient
      .put<Entity>(`${this.BASE_URL}entities/${entity.id}`, entity)
      // The following pipe can be removed if your backend service returns the
      // edited value:
      .pipe(switchMap(() => of(entity)));
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}entities/${id}`);
  }
}
