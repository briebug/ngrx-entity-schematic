import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Entity } from '@state/entity/entity.model';
import { BaseService } from './base.service';

@Injectable()
export class EntityService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  createHero(hero: Entity): Observable<Entity> {
    return this.httpClient.post<Entity>(`${this.BASE_URL}heroes`, hero);
  }

  deleteHero(hero: Entity): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}heroes/${hero.id}`);
  }

  getHero(id: string): Observable<Entity> {
    return this.httpClient.get<Entity>(`${this.BASE_URL}heroes/${id}`);
  }

  getHeroes(): Observable<Array<Entity>> {
    return this.httpClient.get<Array<Entity>>(`${this.BASE_URL}heroes`);
  }

  updateHero(hero: Entity): Observable<Entity> {
    return this.httpClient.put<Entity>(`${this.BASE_URL}heroes/${hero.id}`, hero);
  }
}
