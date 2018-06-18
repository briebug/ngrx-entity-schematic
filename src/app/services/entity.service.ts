import { Injectable } from '@angular/core';
import { Entity } from '../state/entity/entity.model';
import { Observable, of } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  // TEMP file

  constructor() {}

  save(entity: Entity): Observable<Entity> {
    return of(entity);
  }

  search(): Observable<Entity[]> {
    return of([null]);
  }

  loadById(id: number): Observable<Entity> {
    return of(null);
  }

  update(entity: Update<Entity>): Observable<Entity> {
    return of(null);
  }

  deleteById(id: number): Observable<Entity> {
    return of(null);
  }
}
