import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap, filter, map, switchMap, startWith } from 'rxjs/operators';

import { getLoading, getSelectedEntity } from '@state/entity';
import { Entity } from '@state/entity/entity.model';
import { EntityLoadById, EntityInsert, EntityUpdate } from '@state/entity/entity.actions';
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
  showErrors: Boolean;
  entityEdits: Entity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.entity = this.activatedRoute.paramMap.pipe(
      filter((params) => params.has('id')),
      map((params) => params.get('id')),
      tap((id) => this.store.dispatch(new EntityLoadById({ id: +id }))),
      switchMap(() => this.store.pipe(select(getSelectedEntity))),
      map((entity) => ({...entity}))
    );

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
