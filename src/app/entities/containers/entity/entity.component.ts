import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as cloneDeep from 'lodash.clonedeep';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { tap, filter, map, switchMap, startWith } from 'rxjs/operators';

import { getLoading, getSelectedEntity } from '@state/entity';
import { Entity } from '@state/entity/entity.model';
import { EntityLoadById, EntityInsert, EntityUpdate } from '@state/entity/entity.actions';
import { State } from '@state/entity/entity.reducer';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity: Observable<Entity>;
  isLoading: Observable<Boolean>;
  valid: Boolean;
  showErrors: Boolean;
  entityEdits: Entity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.entity = this.activatedRoute.paramMap.pipe(
      filter((params) => params.has('id')),
      map((params) => params.get('id')),
      tap((id) => this.store.dispatch(new EntityLoadById({ id: +id }))),
      switchMap(() => this.store.pipe(select(getSelectedEntity))),
      map((entity) => cloneDeep(entity))
    );

    // TODO: Fix the ExpressionChangedAfterItHasBeenCheckedError related to isLoading
    this.isLoading = this.store.pipe(select(getLoading));
    this.showErrors = false;
  }

  onEntityChange({ entity, valid }: { entity: Entity; valid: Boolean }) {
    this.entityEdits = entity;
    this.valid = valid;
  }

  onSubmit() {
    this.showErrors = true;

    if (!this.valid) {
      return;
    }

    const EntityAction = this.entityEdits.id ? EntityUpdate : EntityInsert;
    this.store.dispatch(new EntityAction({ entity: this.entityEdits }));
  }
}
