import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { catchError, tap, first, filter, map, switchMap } from 'rxjs/operators';

import * as fromStore from '@state/entity';
import { Entity } from '@state/entity/entity.model';
import { EntitySelect, EntityUpdate, EntityLoadById } from '@state/entity/entity.actions';
import { State } from '@state/entity/entity.reducer';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity: Observable<Entity>;
  isLoading: Observable<Boolean>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<State>, private httpClient: HttpClient) {}

  ngOnInit() {
    this.isLoading = this.store.pipe(select(fromStore.getLoading));

    this.entity = this.activatedRoute.paramMap
      .pipe(
        filter((params) => params.has('id')),
        map((params) => params.get('id')),
        tap((id) => this.store.dispatch(new EntitySelect({ id: 1 }))),
        // switchMap(() => this.store.pipe(select(fromStore.getSelectedEntity))),
        switchMap((id) => this.httpClient.get<Entity>(`api/entities/${id}`))
      );

    // TODO: On error / success

    this.entity = this.httpClient.get<Entity>('api/entities/1');
  }

  onSubmit(entity) {
    this.store.dispatch(new EntityUpdate({ entity }));
  }
}
