import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {
  tap,
  filter,
  map,
  switchMap,
  startWith,
  shareReplay
} from 'rxjs/operators';

import { getLoading, getSelectedEntity, getError } from '@state/entity';
import { Entity } from '@state/entity/entity.model';
import {
  EntityLoadById,
  EntityInsert,
  EntityUpdate,
  EntitySelectById
} from '@state/entity/entity.actions';
import { State } from '@state/entity/entity.reducer';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit {
  entity: Observable<Entity>;
  isLoading: Observable<Boolean>;
  valid: Boolean;
  showFormErrors: Boolean;
  entityEdits: Entity;
  errorMessage: Observable<String>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.entity = this.activatedRoute.paramMap.pipe(
      filter((params) =>
        params.has('id') || this.activatedRoute.routeConfig.path === 'add'
      ),
      map((params) => params.get('id')),
      tap((id) => {
        const EntityAction = id ? EntityLoadById : EntitySelectById;
        this.store.dispatch(new EntityAction({ id: +id || null }));
      }),
      switchMap(() => this.store.pipe(select(getSelectedEntity))),
      map((entity) => ({ ...entity }))
    );

    this.isLoading = this.store.pipe(
      select(getLoading),
      shareReplay()
    );

    this.errorMessage = this.store.pipe(
      select(getError),
      shareReplay()
    );

    this.showFormErrors = false;
  }

  onEntityChange({ entity, valid }: { entity: Entity; valid: Boolean }) {
    this.entityEdits = entity;
    this.valid = valid;
  }

  onSubmit() {
    this.showFormErrors = true;

    if (!this.valid) {
      return;
    }

    const EntityAction = this.entityEdits.id ? EntityUpdate : EntityInsert;
    this.store.dispatch(new EntityAction({ entity: this.entityEdits }));
  }
}
